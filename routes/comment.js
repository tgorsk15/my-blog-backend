const { Router } = require('express');
const commentRouter = Router();
const commentsController = require('../controllers/commentsController')
const passport = require('passport');

commentRouter.get('/', passport.authenticate('jwt', {session: false}),commentsController.commentTest)

// post comment
commentRouter.post('/create/:postId', passport.authenticate('jwt', {session: false}),commentsController.createCommentPost)

// delete comment
commentRouter.delete('/remove/:commentId', passport.authenticate('jwt', {session: false}),commentsController.removeCommentDelete)

// like comment
commentRouter.put('/like/:commentId', commentsController.likeCommentPut)

// unlike comment
commentRouter.put('unlike/:commentId', commentsController.dislikeCommentPut)

module.exports = commentRouter