const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const mailer = require('../lib/services/EmailService');

jest.mock('mailer', () => () => ({}));

describe('new-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('sends a new email', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        console.log(app.sendEmail.mock);
        expect(mailer).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });
});
