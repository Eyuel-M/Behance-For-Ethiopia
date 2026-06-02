export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

export function getExpectedToken(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set.");
  return secret;
}

export function isValidSession(token: string | undefined): boolean {
  if (!token) return false;
  try {
    return token === getExpectedToken();
  } catch {
    return false;
  }
}
