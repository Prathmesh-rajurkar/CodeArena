import { dbConnect } from "@/lib/db";
import Question from "@/models/Question";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await dbConnect();
  try {
    const question = await Question.findOne({ slug: params.slug });

    if (!question) {
      return new Response("Question not found", { status: 404 });
    }
    
    return NextResponse.json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
