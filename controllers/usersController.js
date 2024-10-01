const bcrypt = require('bcryptjs')
const db = require('../db/userQrs')
const issueJWT = require('../auth/issueJWT')

exports.userTest = async (req, res) => {
    res.send('here is user')
}

exports.loginUserPost = async (req, res) => {
    
}

exports.signupUserPost = async (req, res) => {
    try {
        let isMain = false
        
        console.log(req.body)
        const info = req.body

        // checks if user is blog owner
        if (info.password === process.env.AUTHOR_CODE) {
            isMain = true
        }
        console.log(isMain)

        // has password
        const hashedPassword = await bcrypt.hash(info.password, 10);
        // Insert user into database
        const newUser = await db.insertUser(info, hashedPassword, isMain);
         
        // issue the token for user
        console.log('newUser', newUser)
        const jwt = await issueJWT.issueToken(newUser, newUser.id)
        console.log('token issued', jwt)

        res.json({
            user: newUser,
            token: jwt.token,
            expiresIn: jwt.expires
        })
    } catch(err) {
        console.error('Error in signupUserPost:', err);
        res.status(500).json({ message: 'An error occurred during signup', error: err.message });
    }

}