import mongoose from 'mongoose';
import { env } from './env';

/**
 * Connects to MongoDB using the URI from environment variables.
 * Exits process on failure.
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Connection to the MongoDB failed")
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }

  // Handle connection events
  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('Mongoose disconnected. Attempting to reconnect...');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('Mongoose reconnected.');
  });
};
