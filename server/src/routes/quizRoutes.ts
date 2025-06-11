import { Router } from 'express';
import { getQuizBySop, submitQuiz } from '../controllers/quizController';
import { requireAuth } from '../middleware/requireAuth';

const router = Router();

router.get('/:sopId', requireAuth, getQuizBySop);
router.post('/:sopId/submit', requireAuth, submitQuiz);

export default router;
