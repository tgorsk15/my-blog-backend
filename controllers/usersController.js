const bcrypt = require('bcryptjs')
const db = require('../db/userQrs')
const issueJWT = require('../auth/issueJWT')

const { body, validationResult } = require("express-validator")

const nameErr = "First and Last name both need to be between 2 and 20 characters"
const usernameErr = "Username must be between 5 and 25 characters"
const passwordErr = "Password must be at least 7 character long"

const validateUser = [
    body("firstName").trim()
        .isLength({ min: 2, max: 20 }).withMessage(nameErr),
    body("lastName").trim()
        .isLength({ min: 2, max: 20 }).withMessage(nameErr),
    body("username").trim()
        .isLength({ min: 5, max: 25}).withMessage(usernameErr),
    body("password").trim()
    .isLength({ min: 7 }).withMessage(passwordErr)
        .custom((value) => {
            const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            if (!specialChar.test(value)){
                throw new Error("Password must include at least one special character")
            }
            return true
        })
]


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



        if (!user) {
            return res.status(401).json({
                success: false,
                msg: "Could not find user. Please check username"
            })
        }

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
                msg: 'Incorrect Password, please try again'
            })
        }

    } catch(err) {
        console.error('Error in loginUserPost:', err);
        res.status(500).json({ 
            message: 'An error occurred during login', error: err.message 
        });
    }

}

exports.signupUserPost = [
    validateUser,
    async (req, res, next) => {
        try {
            let isMain = false
            const info = req.body
            const errors = validationResult(req);

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

            // check for errors in submitted account info:
            if (!errors.isEmpty()) {
                console.log('errors with signup:', errors)
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                })
            }

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
                token: jwt.token,
                expiresIn: jwt.expires
            })
        } catch(err) {
            console.error('Error in signupUserPost:', err);
            res.status(500).json({ message: 'An error occurred during signup', error: err.message });
        } 

    }
    

]

