import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config";

export function generateAccessToken(
  payload: string | Buffer | object,
  expiresIn: string | number = config.jwt.accessExpiry
): string {
  return jwt.sign(payload, config.jwt.accessSecret as string, { expiresIn } as SignOptions);
}

export function generateRefreshToken(
  payload: string | Buffer | object,
  expiresIn: string | number = config.jwt.refreshExpiry
): string {
  return jwt.sign(payload, config.jwt.refreshSecret as string, { expiresIn } as SignOptions);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, config.jwt.accessSecret as string);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, config.jwt.refreshSecret as string);
}
