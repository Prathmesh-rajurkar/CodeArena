"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { upload } from "@imagekit/next";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const { data: session, update } = useSession();
  const user = session?.user;
  const router = useRouter();
  // console.log("User session data:", user);
  const [bio, setBio] = useState(user?.description || "");
  const [previewUrl, setPreviewUrl] = useState(user?.image || "");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleSave = async () => {
    setSaving(true);
    let finalImageUrl = previewUrl;

    try {
      // Upload image only if a new file is selected
      if (file) {
        try {
          const authRes = await fetch("/api/auth/imagekit-auth");
          if (!authRes.ok) throw new Error("Failed to get auth params");
          const { authenticationParameters: auth } = await authRes.json();
          console.log("Auth params:", auth);
          const res = await upload({
            file,
            fileName: `profile-${user?.id}-${Date.now()}.jpg`,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
            signature: auth.signature,
            expire: auth.expire,
            token: auth.token,
            transformation:{
              pre: "w-300,h-300,quality-80,format-jpg",
            }
          });

          if (!res?.url) throw new Error("Image upload failed");
          finalImageUrl = res.url;
          setPreviewUrl(finalImageUrl); // Update preview with uploaded image URL
        } catch (uploadErr) {
          console.error("Image upload failed, saving bio anyway:", uploadErr);
        }
      }

      // Update profile (bio + image if available)
      const updateRes = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: finalImageUrl, description: bio }),
      });

      if (!updateRes.ok) throw new Error("Failed to update profile");
      router.push("/profile"); 
      const sessionUpdate = await update({
        user: {
          ...session?.user,
          image: finalImageUrl,
          description: bio,
        },
      });
      console.log("Session updated:", sessionUpdate);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-white space-y-8">
      {/* Avatar + Upload */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-xl flex flex-col items-center text-center shadow-xl">
        <div className="relative inline-block">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={previewUrl} alt={user?.name || "U"} />
            <AvatarFallback className="bg-black text-6xl">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </Avatar>

          {/* Pencil Icon */}
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-4 right-2 translate-x-1/4 translate-y-1/4 bg-cyan-600 hover:bg-cyan-700 rounded-full p-1 border border-white/10 shadow-lg cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
          </label>
        </div>

        <h1 className="text-2xl font-bold mt-4">{user?.email || "Username"}</h1>
      </div>

      {/* Bio Edit */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-2">Edit Bio</h3>
        <textarea
          className="w-full rounded-lg p-3 bg-black/30 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <div className="flex justify-end mt-3">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
