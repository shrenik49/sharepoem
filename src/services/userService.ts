import { prisma } from "../../prismaClient";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({ where: { username } });
}

export async function findUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

export async function createUser(email: string, username: string, passwordHash: string) {
  return prisma.user.create({ data: { email, username, passwordHash } });
}

export async function storeRefreshToken(userId: number, tokenHash: string, expiresAt: Date) {
  return prisma.refreshToken.create({ data: { userId, tokenHash, expiresAt } });
}

export async function findRefreshTokensByUser(userId: number) {
  return prisma.refreshToken.findMany({ where: { userId } });
}

export async function deleteRefreshTokenById(id: number) {
  return prisma.refreshToken.delete({ where: { id } });
}
