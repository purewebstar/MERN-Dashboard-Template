'use strict'
/**
 *  Module dependencies
 */
const {readAccount, removeAccount} = require('../controllers/Account.controller');
const initAgenda = require('../config/initAgenda');

initAgenda.define(
  "remove email not verified user account",
  { priority: "high", concurrency: 10 },
    async (job) => {
      const { user_id } = job.attrs.data;
      let accountExpired = readAccount.verified(user_id);
      if(accountExpired){
        // remove account
        removeAccount.expired(user_id);
        return
      }
      else return false;
    }
)

initAgenda.start();

const AccountJobs = (app) => {
  app.use("/account-jobs", (req, res) => {
    res.send("Database job added to queue!");
  });
};

module.exports = AccountJobs;