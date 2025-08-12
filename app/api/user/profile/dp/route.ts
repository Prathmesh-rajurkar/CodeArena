import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { user } = session;
  try {
    dbConnect();
    const { image } = await req.json();
    console.log("yuor image url :",image);
    if (!image) {
      return NextResponse.json(
        { message: "Image URL is required" },
        { status: 400 }
      );
    }
    const updateProfile = await User.findByIdAndUpdate(
      user.id,
      { image: image },
      { new: true, select: "-password" }
    );

    return NextResponse.json({
      message: "Profile picture updated successfully",
      user: updateProfile,
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return NextResponse.json(
      { message: "Failed to update profile picture" },
      { status: 500 }
    );
  }
}
