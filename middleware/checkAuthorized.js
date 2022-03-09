const passport = require('passport');

const checkAuthorized = passport.authenticate('jwt', { session: false });

module.exports = checkAuthorized; 