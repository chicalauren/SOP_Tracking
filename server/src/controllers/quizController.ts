import { Request, Response } from 'express';
import Quiz from '../models/Quiz';
import Question from '../models/Question';
import AnswerOption from '../models/AnswerOption';
import UserQuizResult from '../models/UserQuizResult';

export const getQuizBySop = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findOne({ sopId: req.params.sopId });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const questions = await Question.find({ quizId: quiz._id });
    const questionsWithOptions = await Promise.all(
      questions.map(async (q) => {
        const options = await AnswerOption.find({ questionId: q._id });
        return { ...q.toObject(), options };
      })
    );

    res.json({ quiz, questions: questionsWithOptions });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const { answers, userId } = req.body;
    const quiz = await Quiz.findOne({ sopId: req.params.sopId });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const questions = await Question.find({ quizId: quiz._id });
    let correctCount = 0;

    for (const question of questions) {
      const correctOptions = await AnswerOption.find({ questionId: question._id, isCorrect: true });
      const correctIds = correctOptions.map(opt => opt._id.toString()).sort();
      const submittedIds = (answers[question._id] || []).sort();

      if (JSON.stringify(correctIds) === JSON.stringify(submittedIds)) {
        correctCount++;
      }
    }

    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= quiz.passingScore;

    await UserQuizResult.create({
      userId: userId || 'anonymous',
      quizId: quiz._id,
      score,
      passed,
    });

    res.status(200).json({
      message: passed ? 'Passed!' : 'Failed.',
      score,
      passed,
      totalQuestions: questions.length,
      correctAnswers: correctCount
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// client/src/components/QuizForm.tsx
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
  const [result, setResult] = useState<null | { score: number; passed: boolean; message: string }>(null);

  useEffect(() => {
    fetch(`/api/quiz/${id}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions);
        const initialAnswers: { [key: string]: string[] } = {};
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/quiz/${id}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': 'user123' // replace with actual auth header
      },
      body: JSON.stringify({ answers })
    });
    const data = await res.json();
    setResult(data);
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
      {result && (
        <div className={`p-4 mt-4 border rounded ${result.passed ? 'border-green-500' : 'border-red-500'}`}>
          <p>{result.message}</p>
          <p>Score: {result.score}%</p>
        </div>
      )}
    </form>
  );
}

export default QuizForm;
