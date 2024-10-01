const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const bcrypt = require('bcryptjs')
const db = require('../db/userQrs')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
    try {
        const userId = payload.sub;
        const user = await db.findUserByUserById(userId)

        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch (err) {

    }
    
})

passport.use(jwtStrategy)