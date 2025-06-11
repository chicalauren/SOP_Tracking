import express from 'express';
import cors from 'cors';
import sopRoutes from './routes/sopRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/sops', sopRoutes);

app.get('/', (_req, res) => {
  res.send('SOP Tracking API is live');
});

export default app;
