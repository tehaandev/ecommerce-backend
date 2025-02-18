import { config } from "dotenv";
import mongoose from "mongoose";
import path from "path";

config({
  path: path.resolve(__dirname, "../../.env"),
});

const MONGO_URI = process.env.MONGO_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

export const connectDB = async () => {
  try {
    if (!MONGO_URI || !DATABASE_NAME) {
      throw new Error("Connection string not defined");
    }
    if (mongoose.connection.readyState === 1) {
      return Promise.resolve(true);
    }
    await mongoose.connect(MONGO_URI, {
      dbName: DATABASE_NAME,
      maxIdleTimeMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 5,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return Promise.reject(error);
  }
};

