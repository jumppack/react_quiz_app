import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, Question } from './db.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); // for populating req.body

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Quiz server is running' });
});

// GET questions endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the quiz API!')
})

app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions from database' });
  }
});

app.get('/api/question/:id', async (req, res, next) => {
  try {
    const question = await Question.findOne({id: req.params.id});
    if (!question) {
      return res.status(404).json({error: 'Question not found.'})
    }
    res.json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({error: 'Failed to fetch question from database'});
  }
})

// Connect database and start server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
