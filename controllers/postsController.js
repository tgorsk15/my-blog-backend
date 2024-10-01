const db = require('../db/postQrs')

exports.postsTest = async (req, res) => {
    res.send('here is post')
}

exports.postCreatePost = async (req, res) => {
    res.send('creating post')
}

exports.postEditPost = async (req, res) => {
    res.send('editing post and submitting chnages to DB')
}

exports.postRemovePost = async (req, res) => {
    res.send('removing post')
}

exports.publicationPost = async (req, res) => {
    // use the below to change 'published' in DB
    const isPublished = req.params.pblcBoolean
    console.log(isPublished)
    res.send('publish or un-publish the post')
}