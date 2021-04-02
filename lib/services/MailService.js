require('dotenv').config();
var AWS = require('aws-sdk');
const Order = require('../models/Emails');

module.exports = class EmailService {
  static async newEmail({ quantity }) {
    await sendSms(
      // process.env.ORDER_HANDLER_NUMBER,
      `Welcome to Funky Mug, you currently have ${quantity} mugs in your cart`
    );

    const order = await Order.insert({ quantity });

    return order;
  }

  static async allOrders() {
    const order = await Order.produce();

    return order;
  }

  static async allOrdersWithId(id) {
    const order = await Order.produceWithId(id);

    return order;
  }

  static async updateWithId({ quantity }, id) {
    await sendSms(
      // process.env.ORDER_HANDLER_NUMBER,
      `Your cart now contains ${quantity} mugs`
    );

    const order = await Order.update(quantity, id);
    return order;
  }

  static async delete(id) {
    await sendSms(
      `This is confirmation that a mug has been removed from your cart`
    );

    const order = await Order.delete(id);

    return order;
  }
};
