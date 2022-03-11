/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */ 
// -----------------------------------------------------------------
'use strict'
/*
 importing modules
*/
const express = require('express');
// auth controller

const tokens = require('../../controllers/Auth.controller');

const router = express.Router();
/**
 *  auth route api's
 */

// renew token 
router.post('/renew-access/:token', tokens.renew);

module.exports = router;