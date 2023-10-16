import { prisma } from '@/database/prisma';
import { z as zod } from 'zod';
import bcrypt from 'bcrypt';

import { createToken } from '@/utils/jwt';

const userSchema = zod.object({
  email: zod.string().email({ message: 'Must be email format' }),
  password: zod.string().min(8, { message: 'must be min length 8 caracteres' }),
  name: zod.string().min(3, { message: 'must be min length 8 caracteres' }),
});

export async function POST(request: Request) {
  const data = await request.json();

  const { email, password, name } = await userSchema.parseAsync(data);

  const userAlreadyExists = await prisma.user.findFirst({
    where: { email },
  });

  if (userAlreadyExists) {
    const error = { error: 'user already exists' };

    return Response.json(error, {
      status: 400,
    });
  }

  const salts = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salts);

  const user = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      name,
    },
  });

  const token = createToken(user);

  return new Response(JSON.stringify({ token, name: user.name }), {
    status: 201,
  });
}
