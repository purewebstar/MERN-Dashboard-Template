'use strict'
/**
 * importing modules
 */
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   email: String,
   password: String,
   emailVerified: {
       type: Boolean,
       default: false
   },
   firstName: String,
    lastName: String,
    displayName: String,
   external: {
       type: Boolean,
       default: false  // external == false [logged in using local] external == true [logged in using google/facebook]
   },
   joined: {
       type: Date,
       default: new Date()
   },
   google: String,
},{
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema);
