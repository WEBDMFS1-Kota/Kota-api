import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API || 'your-api-key',
  apiSecret: process.env.MAILJET_SECRET || 'your-api-secret',
});

function sendEmail(sendTo: any) {
  const request = mailjet.post('send', {
    version: 'v3.1',
  }).request({
    Messages: [{
      From: {
        Email: process.env.MAILJET_EMAIL,
        Name: 'Kota Forgotten Password Service',
      },
      To: [{
        Email: 'plducar2@gmail.com',
        Name: sendTo.lastname + sendTo.firstname,
      },
      ],
      TemplateID: Number(process.env.MAILJET_RESET_TEMPLATEID),
      TemplateLanguage: true,
      Variables: { pseudo: sendTo.pseudo, resetToken: sendTo.id },
      Subject: 'Reset Password',
      'Mj-campaign': 'Coinplaces',
    },
    ],
  });

  return request;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  sendEmail,
};
