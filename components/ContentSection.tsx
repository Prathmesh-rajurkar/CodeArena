import React from "react";
import {
  Code,
  Trophy,
  Users,
  TrendingUp,
  Lightbulb,
  Edit3,
} from "lucide-react";
import TestimonialCarousel from "./TestimonialCarousel";
import Footer from "./Footer";

const ContentSection = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8 text-cyan-400" />,
      title: "Vast Problem Library",
      description:
        "Access thousands of diverse coding problems, from beginner-friendly to advanced algorithmic challenges.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-cyan-400" />,
      title: "Exciting Contests",
      description:
        "Participate in daily, weekly, and monthly contests to test your skills under pressure and win prizes.",
    },
    {
      icon: <Users className="w-8 h-8 text-cyan-400" />,
      title: "Thriving Community",
      description:
        "Connect with fellow coders, share solutions, discuss strategies, and learn from the best in the community.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-cyan-400" />,
      title: "Detailed Progress Tracking",
      description:
        "Monitor your performance with insightful analytics, track your progress, and identify areas for improvement.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-cyan-400" />,
      title: "Comprehensive Tutorials",
      description:
        "Learn new algorithms and data structures with our curated tutorials and example solutions.",
    },
    {
      icon: <Edit3 className="w-8 h-8 text-cyan-400" />,
      title: "Powerful Code Editor",
      description:
        "Utilize an integrated, customizable code editor with syntax highlighting and multiple language support.",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen py-16 px-4 mt-20">
      {/* Unleash you coding potential */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Unleash Your Coding Potential
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            CodeArena provides a comprehensive platform for competitive
            programming, fostering skill development and community engagement.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 text-center">
          <div className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 cursor-pointer transform hover:scale-105">
            Start Your Journey
          </div>
        </div>
      </div>
      {/* How it works */}
      <div className="bg-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How It Works: Your Journey to Coding Mastery
            </h2>
            <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
              CodeCompete simplifies competitive programming into a seamless and
              rewarding experience. Here's how you can get started.
            </p>
          </div>

          {/* Video Section */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-br from-blue-800 via-purple-700 to-cyan-600 rounded-2xl overflow-hidden shadow-2xl">
              {/* Abstract background pattern */}
              <div className="absolute inset-0 opacity-60">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 md:w-36 md:h-36 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-60 md:h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
              </div>

              {/* Curved path illustration */}
              <div className="relative h-64 md:h-80 lg:h-96 flex items-center justify-center">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 800 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 350 Q200 200 400 250 Q600 300 700 150"
                    stroke="url(#pathGradient)"
                    strokeWidth="8"
                    fill="none"
                    opacity="0.6"
                  />
                  <defs>
                    <linearGradient
                      id="pathGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="50%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Play button */}
                <div className="relative z-10 group cursor-pointer">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-blue-600 ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-8 left-8 w-3 h-3 md:w-4 md:h-4 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="absolute bottom-8 right-8 w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full animate-bounce delay-300"></div>
                <div className="absolute top-12 right-12 w-2 h-2 md:w-3 md:h-3 bg-blue-400 rounded-full animate-bounce delay-700"></div>
              </div>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
      {/* Testimonial */}
      <div className="text-center mb-12 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          What Our Users Say
        </h2>
        <TestimonialCarousel />
      </div>
      {/* Footer */}
      <div className="text-center mb-12 max-w-7xl mx-auto">
        <Footer/>
      </div>
    </div>
  );
};

export default ContentSection;
