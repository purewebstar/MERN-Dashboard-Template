'use strict'
/**
 *  Module dependencies
 */
const initAgenda = require('../config/initAgenda');
const sendMail = require('../config/initMailer');
const ejs = require('ejs');
const path = require('path');

/**
 * 
 *  Email jobs here
 */
// new account verify email report
 initAgenda.define(
  "send new account verify email report",
  { priority: "high", concurrency: 10 },
  async (job) => {
    const { from, to, subject, text, verifyLink} = job.attrs.data;
    let siteLogo = `${process.env.SITE_HOST}/`;
      let siteLink =`${process.env.ORIGIN_ACCESS_HOST}`;
      ejs.renderFile(path.join(__dirname, `../email-templates/account/${'new-account-verify.ejs'}`), 
          {
            email:to,
            siteLogo: siteLogo,
            siteLink: siteLink,
            verifyLink: verifyLink,
          })
          .then(async(result) => {
            let emailTemplate = result;
           await sendMail(from, to, subject, text, emailTemplate);
          })
          .catch(err => {
            console.log('unable to render email template!')
        });

  }
);
// reset password verify email report
initAgenda.define(
  "send reset password verify email report",
  { priority: "high", concurrency: 10 },
  async (job) => {
    const { from, to, subject, text, firstName, verifyLink} = job.attrs.data;
    let siteLogo = `${process.env.SITE_HOST}/`;
      let siteLink =`${process.env.ORIGIN_ACCESS_HOST}`;
      ejs.renderFile(path.join(__dirname, `../email-templates/account/${'reset-password-verify.ejs'}`), 
          {
            firstName: firstName,
            siteLogo: siteLogo,
            siteLink: siteLink,
            verifyLink: verifyLink,
          })
          .then(async(result) => {
            let emailTemplate = result;
           await sendMail(from, to, subject, text, emailTemplate);
          })
          .catch(err => {
            console.log('unable to render email template!')
        });

  }
);

initAgenda.start();

const VerifyEmailJobs = (app) => {
  app.use("/verify-jobs", (req, res) => {
    res.send("verify jobs added to queue!");
  });
};

module.exports = VerifyEmailJobs;