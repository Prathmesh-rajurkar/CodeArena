import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Question from "@/models/Question";
import { runCodeOnJudge0 } from "@/lib/judge0";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { code, language_id, questionId } = await req.json();

    const question = await Question.findById(questionId);
    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
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
        status: passed ? "✅ Passed" : "❌ Failed",
      });
    }

    const allPassed = results.every((r) => r.status === "✅ Passed");

    return NextResponse.json({
      verdict: allPassed ? "Accepted" : "Wrong Answer",
      results,
    });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
