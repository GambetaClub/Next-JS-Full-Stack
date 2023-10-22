'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { UserPost } from '../types/UserPost'
import EditPost from './EditPost'

const fetchUserPosts = async () => {
	const response = await axios.get('/api/posts/userPosts')
	return response.data
}

export default function UserPosts() {
	const { data, isLoading } = useQuery<UserPost>({
		queryFn: fetchUserPosts,
		queryKey: ['user-posts'],
	})
	console.log('🚀 ~ file: UserPosts.tsx:18 ~ UserPosts ~ data:', data)
	if (isLoading) return 'Getting your posts...'
	return (
		<div>
			{data?.posts?.map((post) => (
				<EditPost
					key={post.id}
					id={post.id}
					avatar={data.image}
					name={data.name}
					title={post.title}
					comments={post.comments}
				/>
			))}
		</div>
	)
}
