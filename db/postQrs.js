const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function findPostById(postId) {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            comments: true
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
            comments: true
        }
    })
    return post
}

async function createNewPost(postInfo, userId) {
    const post = await prisma.post.create({
        data: {
            title: postInfo.title,
            content: postInfo.content,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    })
}

// before moving onto comment queries/controllers
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
            title: updatePost.title,
            content: updatePost.content
        }
    })
    console.log('updated post', postUpdated)
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
    console.log(updatedPost)
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