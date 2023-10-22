export type PostType = {
    id: string
    title: string
    createdAt: string
    updatedAt: string
    user: {
        id: string
        name: string
        email: string
        image: string
    }
    comments? : {
        createdAt: string
        id: string
        postId: string
        title: string
        userId: string
        user: {
            id: string
            name: string
            email: string
            image: string
        }
    }[]
}