import jwt from "jsonwebtoken";

export function signInJWT(
  payload: string | Buffer | object,
  secret: string,
  expiresIn: string | number = "1h"
): string {
  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
}
