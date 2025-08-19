"use client";


export default function QuestionInfo({question} : {question: any}) {
  return (
    <div className="flex-1 z-50 h-full rounded">
      <div className="max-w-4xl mx-auto bg-black/70 backdrop-blur-md text-white border border-gray-800 rounded shadow-2xl ">
        <div>
          <div className="bg-gray-800 text-white px-4 py-2.5 font-mono text-sm flex justify-between items-center ">
            <h1 className="text-lg">Description</h1>
          </div>
        </div>
        {/* Title */}
        <div className="space-y-10 p-4">
          <h1 className="text-4xl font-extrabold tracking-tight">{question?.title}</h1>

          {/* Problem Description */}
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">
              Problem Description
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {question?.description || "No description available."}
            </p>
          </section>
    {/* <p>
      {question?.test_cases.map((testCase: any) => (
        <div key={testCase._id}>{testCase.input}</div>
      )
      )}
    </p> */}
          {/* Examples */}
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">Examples</h2>
            <div className="space-y-4">
              {question?.test_cases.map((ex:any) => (
                <div
                  key={ex._id}
                  className="bg-white/5 border border-white/10 p-4 rounded-lg shadow-md"
                >
                  <h4 className="text-lg font-medium text-gray-200">
                    Input : {ex.input}
                  </h4>
                  <p className="text-gray-300 font-mono">Output : {ex.expected_output}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
