export const BCRYPT_SALT = 10;
export const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "secret_key"
);
export const JWT_EXPIRE = process.env.JWT_EXPIRE || "30d";

