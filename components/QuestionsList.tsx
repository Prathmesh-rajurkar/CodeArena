import QuestionCard from './QuestionCard'

const questions = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    slug: 'two-sum',
    solved: true,
  },
  {
    id: '2',
    title: 'Add Two Numbers',
    difficulty: 'Med.',
    slug: 'add-two-numbers',
    solved: false,
  },
  {
    id: '3',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    slug: 'median-of-two-sorted-arrays',
    solved: false,
  },
]

export default function QuestionsList() {
  return (
    <div className="w-full max-w-full mx-auto p-4 ">
      {questions.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}
    </div>
  )
}
