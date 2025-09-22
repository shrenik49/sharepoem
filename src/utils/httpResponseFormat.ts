import { Response } from "express";

export function sendResponse(
  res: Response,
  statusCode: number,
  message: string,
  data: Record<string, any> = {}
) {
  return res.status(statusCode).json({
    statusCode,
    message,
    ...data, // optional payload (errors, tokens, user, etc.)
  });
}