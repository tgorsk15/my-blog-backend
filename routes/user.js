const { Router } = require('express');
const userRouter = Router();
const passport = require('passport');
const usersController = require('../controllers/usersController')

userRouter.get('/', passport.authenticate('jwt', {session: false}), usersController.userTest)

// login
userRouter.post('/login', usersController.loginUserPost)

// signup
userRouter.post('/signup', usersController.signupUserPost)

module.exports = userRouter