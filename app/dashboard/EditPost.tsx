'use client'
import Image from 'next/image'
import { useState } from 'react'

type EditProps = {
	id: string
	avatar: string
	name: string
	title: string
	comments?: {
		id: string
		title: string
		userId: string
	}
}

export default function EditPost({ avatar, name, title, comments }: EditProps) {
	return (
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
				<button className="text-sm font-bold text-red-500">
					Delete
				</button>
			</div>
		</div>
	)
}
