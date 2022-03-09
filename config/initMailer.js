'use strict'
/**
*  Module Dependencies
*/
const sgMail = require('@sendgrid/mail');

const sendMail = async (from, to, subject, text, emailTemplate)=>{
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  (async () => {
    try {
      await sgMail.send({
        to: to,
        from: process.env.SECRET_SITE_EMAIL,
        subject: subject,
        text: 'MERN ACCOUNT USERS',
        html: emailTemplate,
      });
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  })();
}

module.exports = sendMail;
