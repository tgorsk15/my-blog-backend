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

async function createNewPost(postInfo) {
    const post = await prisma.post.create({
        data: {

        }
    })
}


module.exports = {
    findPostByTitle,
    createNewPost
}