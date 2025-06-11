import { useEffect, useState } from 'react';

function QuizHistory() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/quiz/history', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setResults);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">My Quiz History</h1>
      <ul>
        {results.map((r: any, i: number) => (
          <li key={i}>
            SOP: {r.sopId}, Score: {r.score}%, Passed: {r.passed ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizHistory;
