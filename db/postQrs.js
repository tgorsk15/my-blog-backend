const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function findPostById(postId) {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            comments: {
                orderBy: {
                    createdAt: 'asc'
                }
            }
        }
    })
    return post
}

async function findPostByTitle(title) {
    const post = await prisma.post.findUnique({
        where: {
            title: title
        },
        include: {
            comments: {
                orderBy: {
                    createdAt: 'asc'
                }
            }
        }
    })
    return post
}

async function createNewPost(postInfo) {
    const post = await prisma.post.create({
        data: {
            title: postInfo.title,
            content: postInfo.content,
            preview: postInfo.preview,
            user: {
                connect: {
                    id: postInfo.userId
                }
            }
        }
    })
    return post
}


async function getAllPosts() {
    const posts = await prisma.post.findMany({
        include: {
            comments: true
        }
    })
    return posts
}

async function getPublishedPosts() {
    const publishedPosts = await prisma.post.findMany({
        where: {
            published: true
        }
    })
    return publishedPosts
}

async function updatePost(postId, updatedPost) {
    const postUpdated = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            title: updatedPost.newTitle,
            content: updatedPost.newContent
        }
    })
}

async function changePublication(postId, isPublished) {
    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            published: isPublished
        }
    })
    return updatedPost
}

async function removePost(postId) {
    const removedPost = await prisma.post.delete({
        where: {
            id: postId
        }
    })
} 


module.exports = {
    findPostById,
    findPostByTitle,
    createNewPost,
    getAllPosts,
    getPublishedPosts,
    updatePost,
    changePublication,
    removePost
}