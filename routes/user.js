const { Router } = require('express');
const userRouter = Router();
const usersController = require('../controllers/usersController')

userRouter.get('/', usersController.userTest)

module.exports = userRouter