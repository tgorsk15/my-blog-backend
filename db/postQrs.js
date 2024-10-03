const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function findPostByTitle(title) {
    const post = await prisma.post.findUnique({
        where: {
            title: title
        },
        include: {
            children: true,
            files: true
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

// TMW 10/3: Build this function, getPublishedPosts function, and whatever else,
// before moving onto comment queries/controllers
async function getAllPosts() {

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
}

async function removePost(postId) {
    const removedPost = await prisma.post.delete({
    where: {
        id: postId
    }
})
} 

// TMW 10/2: continue to build out some of these functions beforehand...
// or continue looking into how dat can be retrieved properly from React


module.exports = {
    findPostByTitle,
    createNewPost,
    updatePost,
    changePublication,
    removePost
}