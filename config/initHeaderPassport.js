'use strict'
/**
 *  Module Dependencies
 */

const JwtPassport = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const initHeaderPassport = (passport)=>{
    passport.use(new JwtPassport({
    secretOrKey: process.env.ACCESS_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },  async(payload, done) =>{
       await User.findById({_id: payload.payload.user_id})
        .then(user => {
          if (user) {
            return done(null, payload)
          }
          
        })
        .catch(err => {
          return done(err, false);
        });
    }))
}

module.exports = initHeaderPassport;