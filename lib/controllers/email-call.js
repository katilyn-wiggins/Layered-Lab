const { Router } = require('express');
const mailer = require('../services/EmailService');
const order = require('../models/Order');

module.exports = Router()
  .post('/contact', async (req, res, next) => {
    // console.log(req.body, 'hi');
    try {
      const email = await mailer(req.body);
      await order.insert(req.body.message, req.body.messageSubject);
      res.send(email);
    } catch (err) {
      next(err);
    }
  })

  .get('/contact', async (req, res, next) => {
    const allOrders = await order.produce();
    res.send(allOrders);
  });
