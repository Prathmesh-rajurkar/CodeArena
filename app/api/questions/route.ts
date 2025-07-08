import { dbConnect } from "@/lib/db";
import Question from "@/models/Question";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const difficulty = searchParams.get("difficulty"); // 'easy', 'medium', 'hard', or null

  const query: any = {};
  if (difficulty && ["easy", "medium", "hard"].includes(difficulty)) {
    query.difficulty = difficulty;
  }

  try {
    const questions = await Question.find(query, "title slug difficulty").sort({ createdAt: -1 });
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const {
      title,
      slug,
      description,
      difficulty,
      starter_code,
      function_name,
      language,
      test_cases,
    } = await req.json();

    const newQuestion = new Question({
      title,
      slug,
      description,
      difficulty,
      starter_code,
      function_name,
      language,
      test_cases,
    });

    await newQuestion.save();

    return NextResponse.json(
      { message: "Question created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json(
      { error: "Failed to create question" },
      { status: 500 }
    );
  }
}
