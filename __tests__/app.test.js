const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const mailer = require('../lib/services/EmailService');


jest.mock('../lib/services/EmailService.js');

describe('new-app routes', () => {
  beforeAll(() => {
    return setup(pool);
  });
  //post 
  it('sends a new email', () => {
    return request(app)
      .post('/api/contact')
      .send({"sender": "new email", "messageSubject": "whatever"})
      .then((res) => {
        expect(mailer).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          sender: 'new email',
          messageSubject: 'whatever',
        });
      });
  });
  //get
  it('sends a new email', () => {
    return request(app)
      .get('/api/contact')
      .then((res) => {
        expect(mailer).toHaveBeenCalledTimes(1);
        expect(res.body[0]).toEqual({
          id: '1',
          sender: 'new email',
          messageSubject: 'whatever',
        });
      });
  });
});
