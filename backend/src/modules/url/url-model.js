import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },

    shortCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    shortUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  },
);

export const urlModel = mongoose.model("Url", urlSchema);
