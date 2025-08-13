import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!, // keep secret
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL!,
});

export async function GET() {
  try {
    const authenticationParameters = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
    });

    return Response.json({
      authenticationParameters,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Authentication for Imagekit failed",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { fileId } = await req.json();
    if (!fileId) {
      return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
    }

    const result = await imagekit.deleteFile(fileId);
    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error("ImageKit Delete Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}