import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findOne({ email }, "streak maxStreak lastSolved");

  return NextResponse.json({
    streak: user.streak || 0,
    maxStreak: user.maxStreak || 0,
    lastSolved: user.lastSolved
  });
}
