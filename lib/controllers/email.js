const { Router } = require('express');
const mailer = require('../services/EmailService');

module.exports = Router()
  .post('/contact', async (req, res, next) => {
    // console.log(req.body, 'hi');

    try {
      const email = await mailer(req.body);
      // console.log(email);
      res.send(email);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    const allOrders = await OrderService.allOrders();
    res.send(allOrders);
  })

  .get('/:id', async (req, res, next) => {
    const allOrdersWithId = await OrderService.allOrdersWithId(req.params.id);
    res.send(allOrdersWithId);
  })

  .put('/:id', async (req, res, next) => {
    const updateOrderWithId = await OrderService.updateWithId(
      req.body,
      req.params.id
    );
    res.send(updateOrderWithId);
  })

  .delete('/:id', async (req, res, next) => {
    const deleteOrderWithId = await OrderService.delete(req.params.id);
    res.send(deleteOrderWithId);
  });
