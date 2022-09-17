import dotenv from "dotenv";
import mongoose from 'mongoose';
dotenv.config();
const MONGO_URL: string | undefined = process.env.MONGO_URL;

// Connect to mongo db.
export async function init(): Promise<void> {
  if (!MONGO_URL) throw "MONGO_URL is undefined";
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Mongoose Connected');
  }
  catch(error) {
    console.error(`Unable to connect to database(${MONGO_URL}) ${error}`);
    throw error;
  }
}