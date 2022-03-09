'use strict'
/**
 *  Module Dependencies
 */
const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    address: {
        city: String,
        subCity: String,
        country: String
    },  
    phone: Number,
    photo: String,
    phone: String,
    bio: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: true
})

module.exports = mongoose.model('Profile', ProfileSchema)
