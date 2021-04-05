const {Router} = require('express');
const mailer = require('../services/EmailService');
const Order = require('../models/Order');

module.exports = Router()
  .post('/contact', async (req, res, next) => {
    // console.log(req.body, 'hi');
    try {
      const [order] = await Promise.all([
        Order.insert(req.body),
        mailer(req.body),
      ]);

      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .get('/contact', async (req, res, next) => {
    const allOrders = await Order.produce();
    res.send(allOrders);
  });

  // .update('/contact/:id', async (req, res, next) => {
  //   const allOrders = await Order.produce();
  //   res.send(allOrders);
  // })

  // .delete('/contact/:id', async (req, res, next) => {
  //   const allOrders = await Order.produce();
  //   res.send(allOrders);
  // });
