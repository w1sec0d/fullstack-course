import express from 'express';
const app = express();

import calculateBMI from './bmiCalculator';
import { calculator, Operation } from './calculator';

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
      res.status(400).json({ error: 'malformatted parameters' });
      return;
    }
    const calculatedBMI = calculateBMI(height, weight);
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

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: '...' });
  }
  const result = calculator(Number(value1), Number(value2), op as Operation);
  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
