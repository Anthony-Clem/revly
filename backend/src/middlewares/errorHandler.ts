import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    const errors = err.errors.map((error) => ({
      path: error.path.length > 0 ? error.path.join(".") : "root",
      message: error.message,
    }));

    console.error(`Validation error at ${req.path}:`, errors);

    res.status(400).json({
      success: false,
      error: "Validation Error",
      details: errors,
    });
    return;
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`Error occurred at ${req.method} ${req.path}:`, message);

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
