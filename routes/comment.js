const { Router } = require('express');
const commentRouter = Router();
const commentsController = require('../controllers/commentsController')

commentRouter.get('/', commentsController.commentTest)

module.exports = commentRouter