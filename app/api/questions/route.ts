import { dbConnect } from "@/lib/db";
import Question from "@/models/Question";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const questions = await Question.find({}).sort({ createdAt: -1 });
    return NextResponse.json(questions);
  } catch (error) {
    console.log("Error fetching questions:", error);
    return new Response("Internal Server Error", { status: 500 });
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
