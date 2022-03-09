'use strict'
/*
 importing modules
*/
const express = require('express');

// profile controllers
const {
    createProfile,
    updateProfile,
    readProfile,
} = require('../../controllers/Profile.controller');
// file-upload 
const {
    photoUpload
}  = require('../../config/initFileUpload');
// passport Authorization
const checkAuthorized = require('../../middleware/checkAuthorized');

const router = express.Router();

/**
 *  Create profile  routes
 */
router.post('/auth/create-personal', checkAuthorized, createProfile.personal, updateProfile.personal); // authorized router
router.post('/auth/upload-photo', checkAuthorized, photoUpload.single('photo'), createProfile.photo, updateProfile.photo);// authorized router

/**
 *  Update profile routes
 */
router.patch('/auth/upload-photo', checkAuthorized, photoUpload.single('photo'), updateProfile.photo);// authorized router
router.patch('/auth/update-personal', checkAuthorized, updateProfile.personal);// authorized router

/**
 *  Read profile routes
 */
router.get('/auth/read-profile', checkAuthorized, readProfile.auth.byId);// authorized router

module.exports = router;