/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
const passport = require('passport');

const checkAuthorized = passport.authenticate('jwt', { session: false });

module.exports = checkAuthorized; 