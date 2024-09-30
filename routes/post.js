const { Router } = require('express');
const postRouter = Router();
const postsController = require('../controllers/postsController')

postRouter.get('/', postsController.postsTest)


module.exports = postRouter