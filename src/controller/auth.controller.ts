import { Request, Response } from "express";
import { hashPassword, verifyPassword } from "../utils/password";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { validateFields } from "../utils/validator";
import { userToDTO } from "../dto/userDTO";
import {
  findUserByEmail,
  findUserById,
  findRefreshTokensByUser,
  createUser,
  storeRefreshToken,
  deleteRefreshTokenById,
} from "../services/userService";
import bcrypt from "bcrypt";
import { sendResponse } from "../utils/httpResponseFormat";

export async function signUp(req: Request, res: Response) {
  const error = validateFields(req.body, ["email", "password", "username"]);
  if (error) return sendResponse(res, 400, error);

  const { email, password, username } = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) return sendResponse(res, 400, "User already exists");

  const hashedPassword = await hashPassword(password);
  const user = await createUser(email, username, hashedPassword);

  return sendResponse(res, 201, "User created successfully", {
    user: userToDTO(user),
  });
}

export async function signIn(req: Request, res: Response) {
  const error = validateFields(req.body, ["userDetails", "password"]);
  if (error) return sendResponse(res, 400, error);

  const { userDetails, password } = req.body;
  const user =
    (await findUserByEmail(userDetails)) ||
    (await findUserByEmail(userDetails));

  if (!user) return sendResponse(res, 401, "Invalid credentials");

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return sendResponse(res, 401, "Invalid credentials");

  const jwtToken = generateAccessToken({
    sub: user.id,
    email: user.email,
    username: user.username,
  });

  const refreshToken = generateRefreshToken({ sub: user.id });
  const hashed = await hashPassword(refreshToken);

  await storeRefreshToken(
    user.id,
    hashed,
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  );

  return sendResponse(res, 200, "Login successful", {
    jwtToken,
    refreshToken,
  });
}

export async function refreshToken(req: Request, res: Response) {
  const error = validateFields(req.body, ["refreshToken"]);
  if (error) return sendResponse(res, 400, error);

  const { refreshToken } = req.body;

  try {
    const payload = verifyRefreshToken(refreshToken) as any;
    const userId = payload.sub;

    const tokens = await findRefreshTokensByUser(userId);
    const tokenMatch = tokens.find((t) => bcrypt.compareSync(refreshToken, t.tokenHash));

    if (!tokenMatch) return sendResponse(res, 401, "Invalid refresh token");

    const user = await findUserById(userId);
    if (!user) return sendResponse(res, 401, "User not found");

    const accessToken = generateAccessToken({
      sub: user.id,
      email: user.email,
      username: user.username,
    });

    return sendResponse(res, 200, "Access token issued", { accessToken });
  } catch {
    return sendResponse(res, 401, "Invalid or expired refresh token");
  }
}

export async function logout(req: Request, res: Response) {
  const error = validateFields(req.body, ["refreshToken"]);
  if (error) return sendResponse(res, 400, error);

  const { refreshToken } = req.body;

  try {
    const payload = verifyRefreshToken(refreshToken) as any;
    const userId = payload.sub;

    const tokens = await findRefreshTokensByUser(userId);
    for (const value of tokens) {
      if (await bcrypt.compare(refreshToken, value.tokenHash)) {
        await deleteRefreshTokenById(value.id);
      }
    }

    return sendResponse(res, 204, "Logged out successfully");
  } catch {
    return sendResponse(res, 400, "Invalid token");
  }
}
