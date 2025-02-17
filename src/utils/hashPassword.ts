import bcrypt from "bcryptjs";
import { BCRYPT_SALT } from "@/constants";

export default async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(BCRYPT_SALT);
  return bcrypt.hash(password, salt);
}

