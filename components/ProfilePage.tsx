"use client";

import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Line } from "react-chartjs-2";
// import { FaCog } from "react-icons/fa";
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
import axios from "axios";
import { useEffect, useState } from "react";

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

interface Solved {
    _id: string;
    question_id: {
        _id: string;
        title: string;
        slug: string;
        difficulty: string;
    };
    user_id: string;
    language: string;
    result: string;
    createdAt: string;
}

export default function ProfilePage() {
    const { data: session } = useSession();
    const user = session?.user;

    const [solved, setSolved] = useState<Solved[]>([]);

    useEffect(() => {
        async function fetchSolved() {
            try {
                const res = await axios.get<Solved[]>("/api/user/solved");
                setSolved(res.data);
            } catch (err) {
                console.error("Failed to fetch solved:", err);
            }
        }
        fetchSolved();
    }, []);

    // Aggregate monthly solved problems (example using createdAt)
    const now = new Date();
    const currentMonth = now.getMonth(); // 0 = Jan, 7 = Aug

    // Array of all month names
    const allMonths = [
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
    ];

    // Build only labels up to current month
    const labels = allMonths.slice(0, currentMonth + 1);

    // Fill solvedByMonth only up to current month
    const solvedByMonth = Array(currentMonth + 1).fill(0);

    solved.forEach((item) => {
        const month = new Date(item.createdAt).getMonth();
        if (month <= currentMonth) {
            solvedByMonth[month] = (solvedByMonth[month] ?? 0) + 1;
        }
    });

    const monthlyData = {
        labels,
        datasets: [
            {
                label: "Problems Solved",
                data: solvedByMonth,
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
                    <AvatarImage
                        src={user?.image || ""}
                        alt={user?.name || "U"}
                    />
                    <AvatarFallback className="bg-black text-6xl">
                        {user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold">
                    {user?.email || "Username"}
                </h1>
                <p className="text-gray-400 mt-2 max-w-xl">
                    {user?.description}
                </p>
                <div className="flex justify-between gap-4">
                    <Link href={"/profile/edit_profile"}>
                        <Button className="mt-4 bg-cyan-600 hover:bg-cyan-700">
                            Edit Profile
                        </Button>
                    </Link>
                    <Button
                        className="mt-4 bg-red-600 hover:bg-red-700"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                    <h2 className="text-4xl font-bold">{solved.length}</h2>
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
                            legend: { labels: { color: "white" } },
                            tooltip: { mode: "index", intersect: false },
                        },
                        scales: {
                            x: {
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

            {/* Recent Activity */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                <ul className="space-y-2">
                    {[...solved]
                        .sort(
                            (a, b) =>
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                        )
                        .slice(0, 5)
                        .map((s) => (
                            <li
                                key={s._id}
                                className="bg-black/30 p-3 rounded-md border border-white/5"
                            >
                                <p className="text-sm text-white">
                                    <span className="font-semibold">
                                        Solved
                                    </span>
                                    : {s.question_id.title}{" "}
                                    <span className="text-gray-400">
                                        —{" "}
                                        {new Date(
                                            s.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                                <p className="text-xs text-gray-400">
                                    Language: {s.language} | Result: {s.result}
                                </p>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}
