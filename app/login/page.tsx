'use client'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 z-50">
      <div className="w-full max-w-md bg-gray-950 border border-white/10 rounded-xl shadow-lg p-8 space-y-6 z-50">
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        <p className="text-gray-400 text-center text-sm">Login to continue coding and competing.</p>

        <form className="space-y-4 z-50">
          <div>
            <label className="text-sm block mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-gray-950 border border-white/10 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Password</label>
            <input
              type="password"
              className="w-full bg-gray-950 border border-white/10 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition text-black font-semibold py-3 rounded-md"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-cyan-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
