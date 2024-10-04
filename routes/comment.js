const { Router } = require('express');
const commentRouter = Router();
const commentsController = require('../controllers/commentsController')

commentRouter.get('/', commentsController.commentTest)

// post comment
commentRouter.post('/create/:postId', commentsController.createCommentPost)

// delete comment
commentRouter.delete('/remove/:commentId', commentsController.removeCommentDelete)

// like comment
commentRouter.put('/like/:commentId', commentsController.likeCommentPut)

// unlike comment
commentRouter.put('unlike/:commentId', commentsController.dislikeCommentPut)

module.exports = commentRouter