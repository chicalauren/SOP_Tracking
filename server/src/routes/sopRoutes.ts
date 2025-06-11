import express from 'express';
import { getAllSops, createSop } from '../controllers/sopController';

const router = express.Router();

router.get('/', getAllSops);
router.post('/', createSop);

export default router;
