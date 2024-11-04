const userDb = require('./userQrs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function createNewComment(commentInfo, postId) {
    const currentUser = await userDb.findUserByUserById(commentInfo.userId)

    const comment = await prisma.comment.create({
        data: {
            content: commentInfo.commentContent,
            username: currentUser.username,
            user: {
                connect: {
                    id: commentInfo.userId
                }
            },
            post: {
                connect: {
                    id: postId
                }
            }
        }
    })
}

async function removeComment(commentId) {
    const removedComment = await prisma.comment.delete({
        where: {
            id: commentId
        }
    })
}

async function likeComment(commentId) {
    const updatedComment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            likes: {
                increment: 1
            }
        }
    })
    return updatedComment
}

async function dislikeComment(commentId) {
    const updatedComment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            likes: {
                decrement: 1
            }
        }
    })
    return updatedComment
}


module.exports = {
    createNewComment,
    removeComment,
    likeComment,
    dislikeComment
}