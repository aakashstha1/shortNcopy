import mongoose from "mongoose";
import dotenv from "dotenv";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.MONGODB_NAME,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
});
