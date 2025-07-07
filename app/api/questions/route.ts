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
