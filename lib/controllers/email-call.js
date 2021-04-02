const { Router } = require('express');
const mailer = require('../services/EmailService');

module.exports = Router().post('/contact', async (req, res, next) => {
  // console.log(req.body, 'hi');

  try {
    const email = await mailer(req.body);
    // console.log(email);
    res.send(email);
  } catch (err) {
    next(err);
  }
});
