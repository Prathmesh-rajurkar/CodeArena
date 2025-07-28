// components/QuestionCard.tsx
import { CheckCircle2 } from 'lucide-react' // Optional: Use your own SVG
import Link from 'next/link'
// import { QuestionInterface } from './QuestionsList'


type Question = {
  id: string
  title: string
  difficulty: string
  slug: string
  solved: boolean
}

const getDifficultyColor = (difficulty: string) => {
  if (difficulty === 'Easy') return 'text-green-500'
  if (difficulty === 'Medium') return 'text-yellow-500'
  if (difficulty === 'Hard') return 'text-red-500'
  return ''
}

export default function QuestionCard({ question }: { question: Question }) {
  return (
    <Link href={`/questions/${question.slug}`}>
      <div className="flex items-center justify-between bg-zinc-900 p-4 rounded-xl hover:bg-zinc-800 transition cursor-pointer shadow-md mb-2">
        <div className="flex flex-col">
          <span className="text-white font-semibold text-lg">{question.title}</span>
          <span className={`text-sm ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
        </div>
        {question.solved && (
          <CheckCircle2 className="text-green-400 w-6 h-6" /> 
        )}
      </div>
    </Link>
  )
}
