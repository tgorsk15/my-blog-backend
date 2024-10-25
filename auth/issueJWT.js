const jwt = require('jsonwebtoken')

exports.issueToken = async (user, userId) => {
    const id = userId
    const expiresIn = 120;

    const payload = {
        sub: id,
    }

    const signedToken = jwt.sign(payload, process.env.JWT_SECRET, 
        { expiresIn: expiresIn })
    // console.log('signed token', signedToken)
    
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}