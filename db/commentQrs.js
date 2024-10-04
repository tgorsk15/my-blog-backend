const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function createNewComment(commentInfo, postId, userId) {
    const comment = await prisma.comment.create({
        data: {
            content: commentInfo.content,
            user: {
                connect: {
                    id: userId
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