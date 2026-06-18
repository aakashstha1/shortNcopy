import express from "express";
import cors from "cors";
import router from "./router-config.js";
import httpResponseCode from "../constants/http-response-code.js";
import httpResponseMessage from "../constants/http-response-message.js";
import dotenv from "dotenv";
import "./db-config.js";

dotenv.config({ quiet: true });

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use((req, res, next) => {
  next({
    statusCode: httpResponseCode.NOT_FOUND,
    status: httpResponseMessage.notFound,
    message: `${req.method} ${req.url} not found`,
  });
});

app.use((error, req, res, next) => {
  console.log("Garbage error: ", error);

  let statusCode = error.statusCode || httpResponseCode.INTERNAL_SERVER_ERROR;
  let status = error.status || httpResponseMessage.internalServerError;
  let message = error.message || "Internal server error";
  let data = error.detail || null;

  if (error.code === 11000) {
    statusCode = httpResponseCode.CONFLICT;
    status = httpResponseMessage.conflict;
    const field = Object.keys(error.keyPattern)[0];
    const fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
    message = `${fieldLabel} already registered`;
    data = { [field]: `${fieldLabel} already registered` };
  }

  if (error.name === "ValidationError") {
    statusCode = httpResponseCode.BAD_REQUEST;
    status = httpResponseMessage.validationFailed;
    message = "Validation failed";
    data = Object.keys(error.errors).reduce((acc, key) => {
      acc[key] = error.errors[key].message;
      return acc;
    }, {});
  }

  if (error.name === "CastError") {
    statusCode = httpResponseCode.BAD_REQUEST;
    status = httpResponseMessage.validationFailed;
    message = `Invalid ID format for field: ${error.path}`;
  }

  res.status(statusCode).json({
    status,
    message,
    data,
    options: null,
  });
});

export default app;
