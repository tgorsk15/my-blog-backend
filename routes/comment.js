const { Router } = require('express');
const commentRouter = Router();
const commentsController = require('../controllers/commentsController')

commentRouter.get('/comment', commentsController.commentTest)

module.exports = commentRouter