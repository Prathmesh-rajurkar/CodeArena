'use client';

import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function EditProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [bio, setBio] = useState(
    'Passionate about full-stack development and solving DSA challenges.'
  );

  const handleSave = () => {
    // Logic to save updated profile
    console.log('Saving bio:', bio);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-white space-y-8">
      <div className="bg-white/5 border border-white/10 p-8 rounded-xl flex flex-col items-center text-center shadow-xl">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={user?.image || ''} alt={user?.name || 'U'} />
          <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{user?.name || 'Username'}</h1>
        <p className="text-gray-400 mt-2">{user?.email}</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-2">Edit Bio</h3>
        <textarea
          className="w-full rounded-lg p-3 bg-black/30 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-3">
          <Button onClick={handleSave} className="bg-cyan-600 hover:bg-cyan-700">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}