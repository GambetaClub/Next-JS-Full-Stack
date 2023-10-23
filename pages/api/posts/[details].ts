import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method == 'GET') {

        const details = Array.isArray(req.query.details) ? req.query.details[0] : req.query.details;
		try {
            console.log(req.query)
            const data = await prisma.post.findUnique({
                where: 
                    {id: details},
                include: {
                    user: true,
                    comments: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            user: true
                        }
                    },
                }
            })
            return res.status(200).json(data)   
        
		} catch (err) {
            res.status(403).json({err: "Error has occurred with getting the details of the post."})
        }
	}
}
