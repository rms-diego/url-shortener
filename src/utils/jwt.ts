import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

const config = {
  expiresIn: '1d',
};

export function createToken(payload: User) {
  const { JWT_SECRET } = process.env;

  const payloadToken = {
    id: payload.id,
    email: payload.email,
  };

  const tokenCreated = jwt.sign(payloadToken, JWT_SECRET!, config);

  return tokenCreated;
}

export function verifyToken(token: string) {
  const { JWT_SECRET } = process.env;

  const tokenCreated = jwt.verify(token, JWT_SECRET!);

  return tokenCreated;
}
