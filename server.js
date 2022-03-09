require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const initHeaderPassport = require('./config/initHeaderPassport');
const initMongoDb = require('./config/initMongoDb');
const routes = require('./routes');
//const https = require('./src/routes/https');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');
const VerifyEmailJobs = require('./schedules/VerifyEmailJobs');
const AccountJobs = require('./schedules/AccountJobs');
const app = express();
const server = require('http').createServer(app);

app.use(cors());
app.use(
  helmet({ 
    contentSecurityPolicy: false,
    frameguard: true 
  })
); 
app.use(compression()); 
const PORT = process.env.PORT;
initHeaderPassport(passport);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); 
app.use(passport.initialize());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
initMongoDb(mongoose);
/*
   Schedules and Jobs
*/
VerifyEmailJobs(app);
AccountJobs(app);

app.use(routes);
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json(err);
});
server.listen(PORT, function() {
   console.log('listening on port ' + PORT);
});
