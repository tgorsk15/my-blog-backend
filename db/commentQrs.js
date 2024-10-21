const userDb = require('./userQrs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function createNewComment(commentInfo, postId) {
    const currentUser = await userDb.findUserByUserById(commentInfo.userId)
    console.log('user searched for in DB:', currentUser)

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


module.exports = {
    createNewComment,
    removeComment
}