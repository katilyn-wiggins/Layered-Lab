const pool = require('../utils/pool');

// static methods -> Order.insert(): Math.random(), Number.parseInt(), JSON.stringify()
// instance methods -> arr.map(), params.get('code')
module.exports = class Order {
  id;
  messageSubject;

  constructor(row) {
    this.id = row.id;
    this.messageSubject = row.message_subject;
  }

  static async insert(order) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [order.quantity]
    );

    return new Order(rows[0]);
  }

  static async produce() {
    const { rows } = await pool.query('SELECT * from orders');

    return rows.map((row) => new Order(row));
  }

  static async produceWithId(id) {
    const { rows } = await pool.query('SELECT * from orders WHERE id=$1', [id]);

    return rows.map((row) => new Order(row));
  }

  static async update(email, id) {
    const {
      rows,
    } = await pool.query('UPDATE orders SET email=$1 WHERE id=$2 RETURNING *', [
      email,
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
