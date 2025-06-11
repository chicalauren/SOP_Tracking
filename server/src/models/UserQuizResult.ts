import mongoose from 'mongoose';

const userQuizResultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  passed: { type: Boolean, required: true },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('UserQuizResult', userQuizResultSchema);

// server/src/controllers/quizController.ts
import { Request, Response } from 'express';
import Quiz from '../models/Quiz';
import Question from '../models/Question';
import AnswerOption from '../models/AnswerOption';

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
  // Simplified; you'd validate answers and compute the score
  res.status(200).json({ message: 'Quiz submission logic to be implemented' });
};

// server/src/routes/quizRoutes.ts
import express from 'express';
import { getQuizBySop, submitQuiz } from '../controllers/quizController';

const router = express.Router();

router.get('/:sopId', getQuizBySop);
router.post('/:sopId/submit', submitQuiz);

export default router;
