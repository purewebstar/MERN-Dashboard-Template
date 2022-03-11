/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 * 
 */
// -----------------------------------------------------------------
'use strict'
/**
*  Module dependencies
*/
const Agenda = require('agenda');

const initAgenda = new Agenda({
    db: {address: process.env.DATABASE_URI, collection: 'agenda'},
    processEvery: '20 seconds',
    useUnifiedTopology: true
});

module.exports = initAgenda;