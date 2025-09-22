export function userToDTO(user: any) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt,
  };
}
