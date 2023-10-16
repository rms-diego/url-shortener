import { prisma } from '@/database/prisma';
import bcrypt from 'bcrypt';
import { z as zod } from 'zod';

import { createToken } from '@/utils/jwt';

const userSchema = zod.object({
  email: zod.string().email({ message: 'Must be email format' }),
  password: zod.string().min(8, { message: 'must be min length 8 caracteres' }),
});

export async function POST(request: Request) {
  const data = await request.json();

  const { email, password } = await userSchema.parseAsync(data);

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    const error = { error: 'user does not exists' };

    return Response.json(error, {
      status: 400,
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return Response.json(
      { error: 'invalid password' },
      {
        status: 400,
      }
    );
  }

  const token = createToken(user);

  return new Response(JSON.stringify({ token, name: user.name }), {
    status: 200,
  });
}
