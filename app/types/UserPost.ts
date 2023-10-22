
export type UserPost = {
    email: string
    id: string
    image: string
    name: string
    posts?: { 
        id: string
        createdAt: string
        title: string
        comments?: {
            createdAt: string
            id: string
            postId: string
            userId: string
            title: string
        }[]
    }[]
}