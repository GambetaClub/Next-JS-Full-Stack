'use client'
import Image from 'next/image'
import { useState } from 'react'
import Toggle from './Toggle'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

type EditProps = {
	id: string
	avatar: string
	name: string
	title: string
	comments?: {
		id: string
		title: string
		userId: string
	}[]
}

export default function EditPost({
	avatar,
	name,
	title,
	comments,
	id,
}: EditProps) {
	// Toggle
	const [toggle, setToggle] = useState(false)
	let deleteToastId: string
	const queryClient = useQueryClient()
	// Delete post
	const { mutate } = useMutation(
		async (id: string) =>
			await axios.delete('api/posts/deletePost', { data: id }),
		{
			onError: (error) => {
				toast.error('Error deleting that toast', { id: id })
			},
			onSuccess: (data) => {
				toast.success('Post has been deleted.', { id: id })
				queryClient.invalidateQueries(['user-posts'])
			},
		}
	)

	const deletePost = () => {
		toast.loading('Deleting your post', {
			id: id,
		})
		mutate(id)
	}

	return (
		<>
			<div className="bg-white my-8 p-8 rounded-lg">
				<div className="flex items-center gap-2">
					<Image
						width={64}
						height={64}
						className="inline-block mx-2 w-14 rounded-full"
						src={avatar}
						alt="avatar"
						priority
					/>
					<h3 className="font-bold text-gray-700">{name}</h3>
				</div>
				<div className="my-8">
					<p className="break-all">{title}</p>
				</div>
				<div className="flex items-center gap-4">
					<p className="text-sm font-bold text-gray-700">
						{comments?.length} Comments
					</p>
					<button
						onClick={() => setToggle(true)}
						className="text-sm font-bold text-red-500"
					>
						Delete
					</button>
				</div>
			</div>
			{toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
		</>
	)
}
