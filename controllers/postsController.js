const db = require('../db/postQrs')

exports.postsTest = async (req, res) => {
    console.log(req.user)
    res.send('here is post')
}

exports.postCreatePost = async (req, res) => {
    const sentPost = req.body
    console.log('req body', sentPost)

    const createdPost = await db.createNewPost(sentPost, req.user.id)
    res.send('creating post')
}

exports.editPostPut = async (req, res) => {
    res.send('editing post and submitting chnages to DB')
}

exports.postRemoveDelete = async (req, res) => {
    const postId = Number(req.params.postId)
    console.log('post to be deleted', postId)
    const deletedPost = await db.removePost(postId)
    res.send('removing post')
}

exports.publicationPost = async (req, res) => {
    const postId = Number(req.params.postId)
    const isPublished = Boolean(req.params.pblcBoolean)
    console.log(postId, isPublished)

    await db.changePublication(postId, isPublished)
    
    res.send('publish or un-publish the post')
}

exports.viewPostGet = async (req, res) => {
    const postId = Number(req.params.postId)
    const post = await db.findPostById(postId)
    console.log('requested post', post)

    return res.json({
        post: post
    })
}

exports.viewPublishedPostsGet = async (req, res) => {
    const pblcPosts = await db.getPublishedPosts()
    console.log(pblcPosts)
    return res.json({
        posts: pblcPosts
    })
}

exports.getAllPostsGet = async (req, res) => {
    const allPosts = await db.getAllPosts
    console.log(allPosts)
    res.send('author viewing all posts')
}