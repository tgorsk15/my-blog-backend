const { Router } = require('express');
const userRouter = Router();
const passport = require('passport');
const usersController = require('../controllers/usersController')

userRouter.get('/', passport.authenticate('jwt', {session: false}), usersController.userTest)

// login
userRouter.post('/login', usersController.loginUserPost)

// logout
// will have to remove the JWT from localstorage on the frontend when
// user logs out

// signup

// dont think I need this:
// userRouter.get('/signup', usersController.signupUserGet)

userRouter.post('/signup', usersController.signupUserPost)

module.exports = userRouter