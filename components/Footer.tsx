'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaTwitter, FaLinkedin, FaYoutube, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 px-4">
      {/* Subscription Section */}
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Text */}
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-black">
            Join Our Community & Stay Ahead
          </h2>
          <p className="text-sm text-black/80 max-w-md">
            Subscribe to the CodeArena newsletter for the latest problems, contest announcements,
            and valuable coding insights directly in your inbox.
          </p>
        </div>

        {/* Right: Form */}
        <form className="flex flex-col sm:flex-row gap-2 items-center w-full md:w-1/3">
          <Input
            type="email"
            placeholder="Your email address"
            className="bg-black text-white placeholder:text-gray-400 rounded-md w-full"
          />
          <Button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 w-full sm:w-auto"
          >
            Subscribe
          </Button>
        </form>
      </div>

      {/* Footer Base */}
      <div className="mt-12 border-t border-gray-800 pt-6 pb-10 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button className="px-3 py-1 rounded-md bg-zinc-800 text-xs text-white">English</button>
            <span>© 2023 CodeArena.</span>
          </div>

          {/* Center */}
          <p className="text-white font-semibold text-lg">CodeArena</p>

          {/* Right: Socials */}
          <div className="flex space-x-4">
            <a href="#" aria-label="Twitter"><FaTwitter className="hover:text-white" /></a>
            <a href="#" aria-label="GitHub"><FaGithub className="hover:text-white" /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin className="hover:text-white" /></a>
            <a href="#" aria-label="YouTube"><FaYoutube className="hover:text-white" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
