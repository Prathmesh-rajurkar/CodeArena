import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
// import Question from "@/models/Question";
import { NextResponse } from "next/server";
import Submission from "@/models/Submission";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const solvedQuestionsbyUser = await Submission.find({
    user_id: userId,
    result: "Accepted",
  }).populate("question_id", "title slug difficulty");

  return NextResponse.json(solvedQuestionsbyUser || []);
}
