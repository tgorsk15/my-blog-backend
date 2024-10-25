const jwt = require('jsonwebtoken')

exports.issueToken = async (user, userId) => {
    // Get auth header value (we want to send the token through our header)
    // const bearerHeader = req.headers['authorization'];
    const id = userId
    const expiresIn = 20

    const payload = {
        sub: id,
        iat: Date.now()
    }

    const signedToken = jwt.sign(payload, process.env.JWT_SECRET, 
        { expiresIn: expiresIn })
    // console.log('signed token', signedToken)
    
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}