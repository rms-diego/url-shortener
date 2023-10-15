import { prisma } from '@/database/prisma';
import bcrypt from 'bcrypt';

import { userSchema } from '../register/route';
import { createToken } from '@/utils/jwt';

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

  return new Response(JSON.stringify({ token }), {
    status: 200,
  });
}
