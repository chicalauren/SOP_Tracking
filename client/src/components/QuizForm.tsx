import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Option = {
  _id: string;
  text: string;
};

type Question = {
  _id: string;
  text: string;
  type: 'single' | 'multiple';
  options: Option[];
};

function QuizForm() {
  const { id } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [questionId: string]: string[] }>({});

  useEffect(() => {
    fetch(`/api/quiz/${id}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions);
        const initialAnswers = {} as { [key: string]: string[] };
        data.questions.forEach((q: Question) => (initialAnswers[q._id] = []));
        setAnswers(initialAnswers);
      });
  }, [id]);

  const handleChange = (questionId: string, optionId: string, isMultiple: boolean) => {
    setAnswers(prev => {
      const current = prev[questionId];
      return {
        ...prev,
        [questionId]: isMultiple
          ? current.includes(optionId)
            ? current.filter(id => id !== optionId)
            : [...current, optionId]
          : [optionId],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`/api/quiz/${id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    })
      .then(res => res.json())
      .then(data => alert(data.message));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {questions.map(q => (
        <div key={q._id} className="border p-4 rounded">
          <p className="font-semibold mb-2">{q.text}</p>
          {q.options.map(opt => (
            <label key={opt._id} className="block">
              <input
                type={q.type === 'multiple' ? 'checkbox' : 'radio'}
                name={q._id}
                value={opt._id}
                checked={answers[q._id]?.includes(opt._id) || false}
                onChange={() => handleChange(q._id, opt._id, q.type === 'multiple')}
                className="mr-2"
              />
              {opt.text}
            </label>
          ))}
        </div>
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Quiz
      </button>
    </form>
  );
}

export default QuizForm;