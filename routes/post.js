const { Router } = require('express');
const postRouter = Router();
const passport = require('passport');
const postsController = require('../controllers/postsController')

postRouter.get('/', passport.authenticate('jwt', {session: false}), postsController.postsTest)

// create
postRouter.post('/create', passport.authenticate('jwt', {session: false}), postsController.postCreatePost)

// edit
postRouter.put('/edit/:postId', passport.authenticate('jwt', {session: false}), postsController.editPostPut)

// remove
postRouter.delete('/remove/:postId', passport.authenticate('jwt', {session: false}), postsController.postRemoveDelete)

// publish/unpublish
postRouter.post('/publish/:postId/:pblcBoolean', passport.authenticate('jwt', {session: false}), postsController.publicationPost)

// for author viewing:
// view all posts
postRouter.get('/getAll', passport.authenticate('jwt', {session: false}), postsController.getAllPostsGet)

// primarily for regular users:
// view
postRouter.get('/view/:postId', passport.authenticate('jwt', {session: false}), postsController.viewPostGet)

// view all published posts
postRouter.get('/viewAllPublished', passport.authenticate('jwt', {session: false}), postsController.viewPublishedPostsGet)


module.exports = postRouter