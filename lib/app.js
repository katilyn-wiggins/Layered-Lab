const express = require('express');
const app = express();

app.use(express.static(`${__dirname}/../public`));
app.use(express.json());

app.use('/api', require('./controllers/email-call'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
