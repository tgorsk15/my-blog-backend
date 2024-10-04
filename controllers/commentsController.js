const db = require('../db/commentQrs')
const dbPosts = require('../db/postQrs')

exports.commentTest = async (req, res) => {
    res.send('here is comment')
}

exports.createCommentPost = async (req, res) => {
    const postId = Number(req.params.postId)
    const commentInfo = req.body

    await db.createNewComment(commentInfo, postId, req.user.id)
    // have this just to test post shows comments correctly
    const activePost = await dbPosts.findPostById(postId)
    console.log(activePost)
    //

    res.send(`created comment on post: ${postId}`)
}

exports.removeCommentDelete = async (req, res) => {
    const commentId = Number(req.params.commentId)

    // this if for the below test
    // const postId = Number(req.body.postId)
    //

    await db.removeComment(commentId) 
    // have this just to test post shows comments correctly
    // const activePost = await dbPosts.findPostById(postId)
    // console.log(activePost)
    //

    res.send('deleted comment')
}

exports.likeCommentPut = async (req, res) => {
    const commentId = Number(req.params.commentId)
    const likeAmount = req.body.likes
    res.send('liked the comment')
    // need to somehow figure out how to disable both like and dislike
    // buttons when the user clicks, and then also store that in memory
    // somehow that the user has either clicked or clicked the like off
    // seems complicated... maybe hold off on this till the end
}

exports.dislikeCommentPut = async (req, res) => {
    const commentId = Number(req.params.commentId)
    const dislikeAmount = req.body.likes
    res.send('disliked the comment')
}