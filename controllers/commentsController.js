const db = require('../db/commentQrs')

exports.commentTest = async (req, res) => {
    res.send('here is comment')
}

exports.createCommentPost = async (req, res) => {
    const postId = Number(req.params.postId)
    res.send(`created comment on post: ${postId}`)
}

exports.removeCommentDelete = async (req, res) => {
    const commentId = Number(req.params.commentId)
    res.send('deleted comment')
}

exports.likeCommentPut = async (req, res) => {
    const commentId = Number(req.params.commentId)
    const likeAmount = req.body.likes
    res.send('liked the comment')
}

exports.dislikeCommentPut = async (req, res) => {
    const commentId = Number(req.params.commentId)
    const dislikeAmount = req.body.likes
    res.send('disliked the comment')
}