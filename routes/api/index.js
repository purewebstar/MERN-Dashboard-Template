/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
const router = require('express').Router();

const accountRoutes = require('./account');
const authRoutes = require('./auth');
const profileRoutes = require('./profile');


// account routes
router.use('/account', accountRoutes);

// auth routes
router.use('/token', authRoutes);

// profile routes
router.use('/profile', profileRoutes);


module.exports = router;