import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

type Question = {
  id: string;
  title: string;
  slug: string;
  difficulty: "easy" | "medium" | "hard";
};

export default function QuestionsList({ difficulty }: { difficulty: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/questions");
        const data = await res.json();
        console.log(data);
        setQuestions(data || []);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setQuestions([]);
      }
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  const filtered = questions.filter(
    (q) => difficulty === "all" || q.difficulty.toLowerCase() === difficulty
  );

  return (
    <div className="w-full max-w-full mx-auto p-4 ">
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-400">No questions found.</div>
      ) : (
        filtered.map((q) => <QuestionCard key={q.id} question={q} />)
      )}
    </div>
  );
}
