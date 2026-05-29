import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define Schema
const questionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true }
});

export const Question = mongoose.model('Question', questionSchema);

// Seed function
async function seedDatabase() {
  try {
    const count = await Question.countDocuments();
    if (count === 0) {
      console.log('Database empty. Seeding questions...');
      const filePath = path.join(__dirname, 'questions.json');
      const fileData = await fs.readFile(filePath, 'utf8');
      const seedData = JSON.parse(fileData);
      
      await Question.insertMany(seedData);
      console.log(`Successfully seeded ${seedData.length} questions into MongoDB.`);
    } else {
      console.log(`Database already has ${count} questions. Skipping seed.`);
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Connect to MongoDB
export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('CRITICAL: MONGODB_URI environment variable is missing or unconfigured in server/.env!');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB database.');
    
    // Seed the database
    await seedDatabase();
  } catch (error) {
    console.error('Failed to connect to MongoDB database:', error);
    process.exit(1);
  }
}
