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
        console.log('given credentials', loginInfo)
        const user = await db.findUserByUsername(loginInfo.username)

        // could add check to see if user.username = loginInfo.username
        // ... send 'already logged in' msg if needed

        if (!user) {
            return res.status(401).json({
                success: false,
                msg: "Could not find user. Please check username"
            })
        }

        // possibly install form validation later with express validator...

        // check to see if password matches
        const match = await bcrypt.compare(loginInfo.password, user.password)
        if (match) {
            // if valid, user can go ahead and recieve a jwt token
            const jwt = await issueJWT.issueToken(user, user.id)
            console.log('token issued at login', jwt)
            return res.json({
                success: true,
                user: user,
                token: jwt.token,
                expiresIn: jwt.expires
            })
        } else {
            return res.status(401).json({
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

        // check for repeat
        const users = await db.getAllUsers();
        const userExists = users.find(user => user.username === info.username)
        const emailExists = users.find(user => user.email === info.email)

        if (userExists) {
            return res.status(401).json({
                success: false,
                msg: 'This username already exists'
            })
        } else if (emailExists) {
            return res.status(401).json({
                success: false,
                msg: 'This email already exists'
            })
        }

        // possibly install form validation later with express validator...

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
            // might not need to return a token... token is issued at login
            token: jwt.token,
            expiresIn: jwt.expires
        })
    } catch(err) {
        console.error('Error in signupUserPost:', err);
        res.status(500).json({ message: 'An error occurred during signup', error: err.message });
    }

}


exports.logoutUserGet = async (req, res) => {
    // remove jwt token from localStorage on front end
}