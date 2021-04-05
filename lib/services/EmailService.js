require('dotenv').config();
var AWS = require('aws-sdk');
var {SES_CONFIG} = require('../utils/aws-ses');

const AWS_SES = new AWS.SES(SES_CONFIG);

const sender = 'Katilyn <katilynswiggins@gmail.com>';
const recipient = 'katilynswiggins@gmail.com';

const subject = 'Amazon SES Test';

const body_html = `<html>
<head></head>
<body>
    <p>This is a test email</p> 
</body>
</html>`;

const charset = 'UTF-8';

var params = {
  Source: sender,
  Destination: {
    ToAddresses: [recipient],
  },
  Message: {
    Subject: {
      Data: subject,
      Charset: charset,
    },
    Body: {
      Html: {
        Data: body_html,
        Charset: charset,
      },
    },
  },
};

const mailer = ({sender, messageSubject}) => {
  params.Message.Body.Html.Data = sender;
  params.Message.Subject.Data = messageSubject;

  return AWS_SES.sendEmail(params, (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Email sent! Message ID: ', data.MessageId);
    }
  })
};

module.exports = mailer;
