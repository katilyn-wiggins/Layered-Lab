const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const mailer = require('../lib/services/EmailService');
const Order = require('../lib/models/Order');

jest.mock('../lib/services/EmailService.js');

describe('new-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  //post 
  it('sends a new email', () => {
    return request(app)
      .post('/api/contact')
      .send({"messageBody": "new email", "messageSubject": "whatever"})
      .then((res) => {
        expect(mailer).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          messageBody: 'new email',
          messageSubject: 'whatever',
        });
      });
  });
  //get
  it('returns all sent emails', async () => {
    const newOrder = await Order.insert({messageBody: '2:45 pm', messageSubject: 'hello'});

    const res = await request(app)
      .get('/api/contact')

    expect(res.body).toEqual([{id: "1", messageBody: "2:45 pm", messageSubject: "hello"}]);
  });

  //update
  it('updates an order in our database and sends a text message', async () => {
    await Order.insert({"messageBody": "2:45 pm", "messageSubject": "hello"});

    const res = await request(app)
      .put('/api/contact/1')
      .send({messageBody: "2:55 pm"});

    expect(mailer).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      id: '1',
      messageBody: '2:55 pm',
      messageSubject: 'hello'
    });
  });

  //delete
  it('deletes an order in our database with id 1', async () => {
    await Order.insert({"messageBody": "delete test", "messageSubject": "delete"},);
    await Order.insert({"messageBody": "delete test 2", "messageSubject": "delete 2"});

    const res = await request(app)
      .delete('/api/contact/1')


    expect(mailer).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({"id": "1", "messageBody": "delete test", "messageSubject": "delete"});
  });

  //delete again 
  it('deletes an order in our database with id 2', async () => {
    await Order.insert({"messageBody": "delete test", "messageSubject": "delete"},);
    await Order.insert({"messageBody": "delete test 2", "messageSubject": "delete 2"});

    const res = await request(app)
      .delete('/api/contact/2')


    expect(mailer).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({"id": "2", "messageBody": "delete test 2", "messageSubject": "delete 2"});
  });

  //FE Display Test 
  it('gets a list of anonymous messages on get', async () => {
    const allMessages = await Promise.all([
      Order.insert({"messageBody": "test message 1", "messageSubject": "test subject 1"}),
      Order.insert({"messageBody": "test message 2", "messageSubject": "test subject 2"})
    ]);


    const res = await request(app)
      .get('/api/contact')


    expect(mailer).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual([{"id": "1", "messageBody": "test message 1", "messageSubject": "test subject 1"}, {"id": "2", "messageBody": "test message 2", "messageSubject": "test subject 2"}]);
  });
});
