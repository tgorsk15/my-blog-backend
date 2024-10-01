const { Router } = require('express');
const postRouter = Router();
const passport = require('passport');
const postsController = require('../controllers/postsController')

postRouter.get('/', passport.authenticate('jwt', {session: false}), postsController.postsTest)

// create
postRouter.post('/create', passport.authenticate('jwt', {session: false}), postsController.postCreatePost)

// edit
postRouter.post('/edit', passport.authenticate('jwt', {session: false}), postsController.postEditPost)

// remove
postRouter.post('/remove', passport.authenticate('jwt', {session: false}), postsController.postRemovePost)

// publish/unpublish
postRouter.post('/publish/:pblcBoolean', passport.authenticate('jwt', {session: false}), postsController.publicationPost)


module.exports = postRouter