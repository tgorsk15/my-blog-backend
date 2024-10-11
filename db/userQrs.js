const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


async function findUserByUserById(userId) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    })
    return user
}

async function findUserByUsername(username) {
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    })
    return user
}

async function getAllUsers() {
    const users = await prisma.user.findMany()
    return users
}

async function insertUser(info, hashPassword, isMain) {
    console.log('inserting')
    const user = await prisma.user.create({
        data: {
            email: info.email,
            firstName: info.firstName,
            lastName: info.lastName,
            username: info.username,
            password: hashPassword,
            isAuthor: isMain
        }
    })
    return user
}




module.exports = {
    findUserByUserById,
    findUserByUsername,
    getAllUsers,
    insertUser
}