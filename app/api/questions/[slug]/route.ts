import { dbConnect } from "@/lib/db";
import Question from "@/models/Question";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();
  try {
    const { slug } = await params;
    const question = await Question.findOne({ slug });

    if (!question) {
      return new Response("Question not found", { status: 404 });
    }
    
    return NextResponse.json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
