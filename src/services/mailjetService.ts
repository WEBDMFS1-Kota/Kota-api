import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API || 'your-api-key',
  apiSecret: process.env.MAILJET_SECRET || 'your-api-secret',
});

function sendEmail(sendTo: any, variables: any, emailConfig: any) {
  const request = mailjet.post('send', {
    version: 'v3.1',
  }).request({
    Messages: [{
      From: {
        Email: process.env.MAILJET_EMAIL,
        Name: 'Kota Noreply',
      },
      To: [{
        Email: sendTo.email,
        Name: sendTo.lastname + sendTo.firstname,
      },
      ],
      TemplateID: Number(emailConfig.emailID),
      TemplateLanguage: true,
      Variables: variables,
      Subject: emailConfig.subject,
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
