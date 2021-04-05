const pool = require('../utils/pool');

// static methods -> Order.insert(): Math.random(), Number.parseInt(), JSON.stringify()
// instance methods -> arr.map(), params.get('code')
module.exports = class Order {
  id;
  messageSubject;
  messageBody;

  constructor(row) {
    this.id = row.id;
    this.messageSubject = row.message_subject;
    this.messageBody = row.message_body;
  }

  static async insert(order) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO orders (message_body, message_subject) VALUES ($1, $2) RETURNING *',
      [order.messageBody, order.messageSubject]
    );

    return new Order(rows[0]);
  }

  static async produce() {
    const {rows} = await pool.query('SELECT * from orders');

    return rows.map((row) => new Order(row));
  }

  static async produceWithId(id) {
    const {rows} = await pool.query('SELECT * from orders WHERE id=$1', [id]);

    return rows.map((row) => new Order(row));
  }

  static async update(messageBody, id) {
    const {
      rows,
    } = await pool.query('UPDATE orders SET message_body=$1 WHERE id=$2 RETURNING *', [
      messageBody,
      id,
    ]);
    return new Order(rows[0]);
  }

  static async delete(id) {
    const {
      rows,
    } = await pool.query('DELETE from orders WHERE id=$1 RETURNING *', [id]);

    return new Order(rows[0]);
  }
};
