import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Question from "@/models/Question";
import { runCodeOnJudge0 } from "@/lib/judge0";
import Submission from "@/models/Submission";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  console.log(session);
  const userId = session?.user?.id;
  const userEmail = session?.user?.email;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } else {
    console.log(userId);
  }
  try {
    const { code, language_id, questionId } = await req.json();

    const question = await Question.findById(questionId);
    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    const testCases = question.test_cases;

    const results = [];

    for (const test of testCases) {
      const result = await runCodeOnJudge0(language_id, code, test.input);

      const actual = (result.stdout || result.stderr || "").trim();
      const expected = test.expected_output.trim();

      const passed = actual === expected;

      results.push({
        input: test.input,
        expected_output: expected,
        actual_output: actual,
        status: passed ? "Passed" : "Failed",
      });
    }

    const allPassed = results.every((r) => r.status === "Passed");
    if (allPassed && userEmail) {
      const user = await User.findOne({ email: userEmail });

      const today = new Date();
      const last = new Date(user.lastSolved);
      const diffDays = Math.floor(
        (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
      );

      let newStreak = user.streak || 0;
      if (diffDays === 1) {
        newStreak += 1; // ✅ continued streak
      } else if (diffDays === 0) {
        newStreak = newStreak; // ✅ same day
      } else {
        newStreak = 1; // 🔁 reset streak
      }

      await User.updateOne(
        { email: userEmail },
        {
          $set: {
            lastSolved: today,
            streak: newStreak,
            maxStreak: Math.max(user.maxStreak || 0, newStreak),
          },
          $addToSet: { solvedQuestions: question._id },
        }
      );
      await Submission.create({
        question_id: question._id,
        user_id: userId,
        language: language_id,
        code,
        result: allPassed ? "Accepted" : "Wrong Answer",
        output: JSON.stringify(results),
      });
    }

    return NextResponse.json({
      verdict: allPassed ? "Accepted" : "Wrong Answer",
      results,
    });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
