/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
'use strict'
/*
* Importing modules
*/
const express = require('express');
// account controllers
const {
    createAccount,
    readAccount,
    updateAccount,
    verifyAccount,
} = require('../../controllers/Account.controller');

// passport Authorization
const checkAuthorized = require('../../middleware/checkAuthorized');

// router
const router = express.Router();

/**
 *   Account api routes
 */

/**
 *  Account verification routes
 */
// email verification for new account
router.post('/verify/new-account/:id', verifyAccount.newAccount);
// email verification for reseting password
router.post('/verify/reset-password', verifyAccount.resetPassword);

/**
 *  Account create and read (local, google & facebook)
 */
router.post('/sign-up/local', createAccount.local);
router.post('/login/local', readAccount.local);
// ------------- Google Account -------------
// Google login / signup account page
router.post('/google', readAccount.google, createAccount.google);

router.get('/auth/read-account', checkAuthorized, readAccount.byId); // authorized routes  

/**
 *  Update routes
 */
// update password
router.patch('/auth/update-password', checkAuthorized, updateAccount.updatePassword); // authorized routes
// new account 
router.patch('/new-account',  updateAccount.newAccount);
// reset password
router.patch('/reset-password', updateAccount.resetPassword); // authorized routes
// check and verify for reset password
router.patch('/check-reset-password', updateAccount.checkResetPassword); // authorized routes

module.exports = router;