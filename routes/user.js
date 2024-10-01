const { Router } = require('express');
const userRouter = Router();
const usersController = require('../controllers/usersController')

userRouter.get('/', usersController.userTest)

// login
userRouter.post('/login', usersController.loginUserPost)

// signup

// dont think I need this:
// userRouter.get('/signup', usersController.signupUserGet)

userRouter.post('/signup', usersController.signupUserPost)

module.exports = userRouter