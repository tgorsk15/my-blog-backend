const jwt = require('jsonwebtoken')

exports.issueToken = async (user, userId) => {
    const id = userId
    const expiresIn = 259200; // 3 days

    const payload = {
        sub: id,
    }

    const signedToken = jwt.sign(payload, process.env.JWT_SECRET, 
        { expiresIn: expiresIn })
    
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}