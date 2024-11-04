const express = require('express');
const app = express();
const cors = require("cors");
const passport = require('passport')
const session = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store')
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient()
require('dotenv').config();
require('./auth/passport')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://thedailycoder.netlify.app"
        ]
    })
)

// import routers here
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const commentRouter = require('./routes/comment')

// session info
const sessionStore = new PrismaSessionStore(
    prisma,
    {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    }
)

app.use(session({
    store: sessionStore,
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}))


// use routers here
app.use("/", indexRouter)
app.use("/user", userRouter)
app.use("/post", postRouter)
app.use("/comment", commentRouter)



const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`always watchin you on ${PORT}`))