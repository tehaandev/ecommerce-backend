import { SignJWT } from "jose";
import { JWT_EXPIRE, JWT_SECRET } from "../constants/index";

export default async function generateJwt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRE)
    .sign(JWT_SECRET);
}

