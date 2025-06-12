import express from 'express';
import cors from 'cors';
import sopRoutes from './routes/sopRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/sops', sopRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (_req, res) => {
  res.send('SOP Tracking API is live');
});

export default app;
