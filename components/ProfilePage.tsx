"use client";

import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bar, Line } from "react-chartjs-2";
import { FaCog } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Link from "next/link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const mockActivity = [
  { type: "Solved", title: "Two Sum", time: "2 hours ago", language: "Python" },
  {
    type: "Contest",
    title: "Bi-Weekly Contest #123",
    time: "2 days ago",
    language: "",
  },
  {
    type: "Posted",
    title: "Data Structures",
    time: "4 days ago",
    language: "Thread",
  },
  {
    type: "Solved",
    title: "Longest Common Subsequence",
    time: "1 week ago",
    language: "C++",
  },
  {
    type: "Contest",
    title: "Bi-Weekly Contest #45",
    time: "2 weeks ago",
    language: "",
  },
];

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  const monthlyData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Problems Solved",
        data: [5, 7, 9, 11, 13, 12],
        borderColor: "#22d3ee",
        backgroundColor: "rgba(34, 211, 238, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white space-y-10 z-60">
      {/* Header Section */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-xl flex flex-col items-center text-center shadow-xl">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={user?.image || ""} alt={user?.name || "U"} />
          <AvatarFallback className="bg-black text-6xl">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{user?.email || "Username"}</h1>
        <p className="text-gray-400 mt-2 max-w-xl">{user?.description}</p>
        <div className="flex justify-between gap-4">
          <Link href={"/profile/edit_profile"}>
            <Button className="mt-4 bg-cyan-600 hover:bg-cyan-700 cursor-pointer">
              Edit Profile
            </Button>
          </Link>

          <Button
            className="mt-4 bg-red-600 hover:bg-red-700 cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <h2 className="text-4xl font-bold">785</h2>
          <p className="text-gray-400 mt-2">Problems Solved</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <h2 className="text-4xl font-bold">#123</h2>
          <p className="text-gray-400 mt-2">Global Rank</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <h2 className="text-4xl font-bold">42</h2>
          <p className="text-gray-400 mt-2">Contests Participated</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Monthly Progress</h3>
        <Line
          data={monthlyData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: "white",
                },
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
            scales: {
              x: {
                type: "category",
                ticks: { color: "white" },
                grid: { color: "#333" },
              },
              y: {
                ticks: { color: "white" },
                grid: { color: "#333" },
              },
            },
          }}
        />
      </div>

      {/* Achievements & Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
            <h4 className="font-semibold">First Blood</h4>
            <p className="text-sm text-gray-400">
              First to solve a contest problem
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
            <h4 className="font-semibold">Master Coder</h4>
            <p className="text-sm text-gray-400">
              Achieved top 5 in 3 contests
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
            <h4 className="font-semibold">Community Contributor</h4>
            <p className="text-sm text-gray-400">
              Posted 50+ solutions & guides
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
            <h4 className="font-semibold">Problem Creator</h4>
            <p className="text-sm text-gray-400">
              Created 10+ unique challenges
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Settings</h4>
            <FaCog className="text-white" />
          </div>
          <Button className="w-full mt-2 bg-gray-700 hover:bg-gray-800">
            Account Settings
          </Button>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-2">
          {mockActivity.map((act, i) => (
            <li
              key={i}
              className="bg-black/30 p-3 rounded-md border border-white/5"
            >
              <p className="text-sm text-white">
                <span className="font-semibold">{act.type}</span>: {act.title}{" "}
                <span className="text-gray-400">— {act.time}</span>
              </p>
              {act.language && (
                <p className="text-xs text-gray-400">
                  Language: {act.language}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
