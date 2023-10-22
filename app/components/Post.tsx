'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function Post({ name, avatar, postTitle, id, comments }) {
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
				<p className="break-all">{postTitle}</p>
			</div>
			<div>
				<Link href={`/post/${id}`}>
					<p className="text-sm font-bold text-gray-700">
						{comments?.length} Comments
					</p>
				</Link>
			</div>
		</div>
	)
}
