import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

function HeroSection() {
  return (
    <div className="flex flex-col items-center text-center justify-center lg:w-180 w-100 lg:mt-40 mt-30 m-auto text-white px-lg-36">
        <h1 className="lg:text-7xl text-6xl font-bold my-3">
          {"Master Your Code, Dominate the Compete"}
        </h1>
        <p className="text-gray-500 lg:p-5">CodeArena is your ultimate platform for competitive programming. Solve challenging problems, join thrilling contests, and climb the global leaderboard. Sharpen your skills and achieve coding excellence.</p>
        <div>
          <Button className="bg-cyan-600 text-white px-6 py-3 rounded-md hover:bg-cyan-700 transition-colors mt-6">
            <Link href="/questions">Start Coding Now</Link>
          </Button>
        </div>
      </div>
  )
}

export default HeroSection