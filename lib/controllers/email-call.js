const {Router} = require('express');
const EmailService = require('../services/EmailService');
const Order = require('../models/Order');

module.exports = Router()
  .post('/contact', async (req, res, next) => {
    // console.log(req.body, 'hi');
    try {
      const [order] = await Promise.all([
        Order.insert(req.body),
        EmailService.createEmail(req.body),
      ]);

      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .get('/contact', async (req, res, next) => {
    const allOrders = await Order.produce();
    console.log(allOrders);
    res.send(allOrders);

  })

  .put('/contact/:id', async (req, res, next) => {
    const updateWithId = await Order.update(
      req.body.messageBody,
      req.params.id
    );
    res.send(updateWithId);
  })


  .delete('/contact/:id', async (req, res, next) => {
    const deleteOrder = await Order.delete(req.params.id);
    res.send(deleteOrder);
  });
