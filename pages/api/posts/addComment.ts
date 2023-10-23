import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: 'Please sign in' });

    // Get user
    const email = session.user?.email;

    if (!email) {
      return res.status(400).json({ message: 'Email is missing in the session' });
    }

    try {
      const prismaUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!prismaUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { title, postId } = req.body.data;

      if (!title || title.trim() === '') {
        return res.status(400).json({ message: 'Please do not leave the comment empty' });
      }

      const result = await prisma.comment.create({
        data: {
          message: title,
          userId: prismaUser.id,
          postId,
        },
      });

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while adding the comment' });
    }
  }
}
