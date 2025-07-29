"use client";

const examples = [
  {
    id: 1,
    title: "Example 1",
    content: "Because nums[1] + nums[0] == 9, we return [0, 1]",
  },
  {
    id: 2,
    title: "Example 2",
    content: "Because nums[1] + nums[2] == 6, we return [1, 2]",
  },
];

export default function QuestionInfo() {
  return (
    <div className="flex-1 z-50 h-full overflow-y-auto scrollbar-thin p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-black/70 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-white/10 p-6 md:p-10 space-y-10">
        {/* Title */}
        <h1 className="text-4xl font-extrabold tracking-tight">Two Sum</h1>

        {/* Problem Description */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Problem Description</h2>
          <p className="text-gray-300 leading-relaxed">
            Given an array of integers <code className="font-mono text-white">nums</code> and an integer{" "}
            <code className="font-mono text-white">target</code>, return indices of the two numbers such that they add up to
            target.
            <br />
            <br />
            You may assume that each input has exactly one solution, and you may not use the same element twice.
          </p>
        </section>

        {/* Constraints */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Constraints</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>You can return the answer in any order.</li>
            <li><code className="font-mono">-10⁹ ≤ nums[i] ≤ 10⁹</code></li>
            <li><code className="font-mono">-10⁹ ≤ target ≤ 10⁹</code></li>
            <li>Only one valid answer exists.</li>
          </ul>
        </section>

        {/* Examples */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Examples</h2>
          <div className="space-y-4">
            {examples.map((ex) => (
              <div
                key={ex.id}
                className="bg-white/5 border border-white/10 p-4 rounded-lg shadow-md"
              >
                <h4 className="text-lg font-medium text-gray-200">{ex.title}</h4>
                <p className="text-gray-300 font-mono">{ex.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
