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
		if (!session) {
			return res.status(401).json({ message: 'Please sign in to make a post' });
		}

		const title: string = req.body.title;
		const email = session.user?.email;

		if (!email) {
			return res.status(400).json({ message: 'Email is missing in the session' });
		}

		const prismaUser = await prisma.user.findUnique({
			where: { email },
		});

		if (!prismaUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Check title
		if (!title || title.trim() === '') {
			return res.status(400).json({ message: 'Please do not leave the title empty' });
		}
		if (title.length > 300) {
			return res.status(400).json({ message: 'Please write a shorter post' });
		}

		try {
			const result = await prisma.post.create({
				data: { title, userId: prismaUser.id },
			});
			return res.status(200).json(result);
		} catch (err) {
			console.error(err);
			return res.status(500).json({
				err: 'An error has occurred while making a post.',
			});
		}
	}
}
