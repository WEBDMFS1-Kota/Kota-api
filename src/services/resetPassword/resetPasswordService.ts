import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API || 'your-api-key',
  apiSecret: process.env.MAILJET_SECRET || 'your-api-secret',
});

function sendEmail(sendTo: any, options: any) {
  const request = mailjet
    .post('send', {
      version: 'v3.1',
    })
    .request({
      Messages: [{
        From: {
          Email: process.env.MAILJET_EMAIL,
          Name: 'Coinplaces',
        },
        To: [{
          Email: sendTo.email,
          Name: sendTo.lastname + sendTo.firstname,
        },
        ],
        TemplateID: options.emailID,
        TemplateLanguage: true,
        Variables: sendTo.pseudo,
        Subject: 'test',
        'Mj-campaign': 'Coinplaces',
      },
      ],
    });
  request
    .then(() => {
      console.log(`[MAILJET] Sent message ${options.emailID} to ${sendTo.email}`);
    })
    .catch((err: any) => {
      console.log('[MAILJET] There is an error: ', err.statusCode);
    });
}

export {
  // eslint-disable-next-line import/prefer-default-export
  sendEmail,
};
