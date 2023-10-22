'use client'

import Post from '@/app/components/Post'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import AddComment from '@/app/components/addComment'
import Image from 'next/image'

type URL = {
	params: {
		slug: string
	}
}

type Comment = {
	id: string
	user: {
		name: string
		image: string
	}
	createdAt: string
	message: string
	// Add other properties if necessary
}

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/posts/${slug}`)
	return response.data
}

export default function PostDetail(url: URL) {
	const { data, isLoading } = useQuery({
		queryKey: ['detail-post'],
		queryFn: () => fetchDetails(url.params.slug),
	})
	if (isLoading) return 'Loading'
	console.log(data)
	return (
		<div>
			<Post
				id={data.id}
				postTitle={data.title}
				name={data.user.name}
				avatar={data.user.image}
				comments={data.comments}
			/>
			<AddComment id={data?.id} />
			{data?.comments?.map((comment: Comment) => (
				<div key={comment.id} className="bg-white my-8 p-8 rounded-lg">
					<div className="flex items-center gap-2">
						<Image
							width={24}
							height={24}
							src={comment.user?.image}
							alt="avatar"
						/>
						<h3 className="font-bold">{comment.user?.name}</h3>
						<h3 className="font-sm text-black-300">
							{comment.createdAt}
						</h3>
					</div>
					<div>
						<div className="py-4">{comment.message}</div>
					</div>
				</div>
			))}
		</div>
	)
}
