import express from 'express';
const app = express();

import calculateBMI from './bmiCalculator';

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    let height = Number(req.query.height);
    let weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
      res.status(400).json({ error: 'malformatted parameters' });
      return;
    }
    let calculatedBMI = calculateBMI(height, weight);
    res.status(200).json({
      height,
      weight,
      bmi: calculatedBMI,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      res.status(400).json({ error: 'malformatted parameters' });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
