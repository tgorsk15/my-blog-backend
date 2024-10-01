const bcrypt = require('bcryptjs')
const db = require('../db/userQrs')
const issueJWT = require('../auth/issueJWT')

exports.userTest = async (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'You are authenitcated'
    })
}

exports.loginUserPost = async (req, res) => {
    try {
        const loginInfo = req.body;
        const user = await db.findUserByUsername(loginInfo.username)

        // could add check to see if user.username = loginInfo.username
        // ... send 'already logged in' msg if needed

        if (!user) {
            res.status(401).json({
                success: false,
                msg: "Could not find user. Please check username"
            })
        }

        // check to see if password matches
        const match = await bcrypt.compare(loginInfo.password, user.password)
        if (match) {
            // if valid, user can go ahead and recieve a jwt so they don't
            // have to keep logging in
            const jwt = await issueJWT.issueToken(user, user.id)
            console.log('token issued at login', jwt)
            res.json({
                success: true,
                user: user,
                token: jwt.token,
                expiresIn: jwt.expires
            })
        } else {
            res.status(401).json({
                success: false,
                msg: 'You entered the wrong password'
            })
        }

    } catch(err) {
        console.error('Error in loginUserPost:', err);
        res.status(500).json({ message: 'An error occurred during login', error: err.message });
    }

}

exports.signupUserPost = async (req, res) => {
    try {
        let isMain = false
        const info = req.body

        // checks if user is blog owner
        if (info.password === process.env.AUTHOR_CODE) {
            isMain = true
        }
        console.log(isMain)

        // hash password and insert into DB
        const hashedPassword = await bcrypt.hash(info.password, 10);
        const newUser = await db.insertUser(info, hashedPassword, isMain);
         
        // issue the token for user
        console.log('newUser', newUser)
        const jwt = await issueJWT.issueToken(newUser, newUser.id)
        console.log('token issued', jwt)

        res.json({
            success: true,
            user: newUser,
            // React needs to take this token and store it in localStorage...
            token: jwt.token,
            expiresIn: jwt.expires
        })
    } catch(err) {
        console.error('Error in signupUserPost:', err);
        res.status(500).json({ message: 'An error occurred during signup', error: err.message });
    }

}