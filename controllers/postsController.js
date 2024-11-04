const db = require('../db/postQrs')

exports.postsTest = async (req, res) => {
    res.send('here is post')
}

exports.postCreatePost = async (req, res) => {
    const sentPost = req.body

    const createdPost = await db.createNewPost(sentPost)
    res.json({
        createdPost: createdPost
    })
}

exports.editPostPut = async (req, res) => {
    const postId = Number(req.params.postId)
    const postInfo = req.body
    const updatedPost = await db.updatePost(postId, postInfo)
    res.json('all done')
}

exports.postRemoveDelete = async (req, res) => {
    const postId = Number(req.params.postId)
    const deletedPost = await db.removePost(postId)
    res.send('removing post')
}


exports.publicationPost = async (req, res) => {
    let isPublished;
    const postId = Number(req.params.postId)
    if (req.params.pblcBoolean === 'true') {
        isPublished = true
    } else if (req.params.pblcBoolean === 'false') {
        isPublished = false
    }

    const updatedPost = await db.changePublication(postId, isPublished)
    
    res.json({
        success: true,
        updatedPost: updatedPost
    })
}

exports.viewPostGet = async (req, res) => {
    const postId = Number(req.params.postId)
    const post = await db.findPostById(postId)

    return res.json({
        post: post
    })
}

exports.viewPublishedPostsGet = async (req, res) => {
    const pblcPosts = await db.getPublishedPosts()
    return res.json({
        posts: pblcPosts
    })
}

exports.getAllPostsGet = async (req, res) => {
    const allPosts = await db.getAllPosts()
    return res.json({
        posts: allPosts
    })
}