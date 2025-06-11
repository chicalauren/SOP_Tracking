import { Request, Response } from 'express';

export const getAllSops = (_req: Request, res: Response) => {
  res.json([{ id: '1', title: 'Example SOP' }]);
};

export const createSop = (req: Request, res: Response) => {
  const { title, version } = req.body;
  res.status(201).json({ message: 'SOP created', data: { title, version } });
};
