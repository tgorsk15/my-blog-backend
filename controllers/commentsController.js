const db = require('../db/commentQrs')
const dbPosts = require('../db/postQrs')

exports.commentTest = async (req, res) => {
    res.send('here is comment')
}

exports.createCommentPost = async (req, res) => {
    const postId = Number(req.params.postId)
    const commentInfo = req.body
    console.log('here is commentInfo and postId', commentInfo, postId)

    await db.createNewComment(commentInfo, postId)
    // have this just to test post shows comments correctly
    const activePost = await dbPosts.findPostById(postId)
    console.log(activePost)

    res.json({
        success: true,
        post: activePost
    })
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
    console.log('liking')
    const commentId = Number(req.params.commentId)
    const currentLikes = req.body.likes
    console.log('current amount', currentLikes)

    const newComment = await db.likeComment(commentId)
    console.log(newComment)
    res.json({
        success: true,
        newComment: newComment
    })
}

// TMW 10/22: continue to build out like/dislike system
// ... need to also set up system that prevents double likes or double
// dislikes... can't disable it entirely

exports.dislikeCommentPut = async (req, res) => {
    console.log('disliking')
    const commentId = Number(req.params.commentId)
    const currentLikes = req.body.likes

    if (currentLikes === 0) {
        console.log('already at zero')
        return res.json({
            success: true,
            msg: 'already at zero'
        })
    }
    console.log('current amount', currentLikes)

    const newComment = await db.dislikeComment(commentId)
    console.log(newComment)

    res.json({
        success: true,
        newComment: newComment
    })
}