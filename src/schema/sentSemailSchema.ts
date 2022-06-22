const sentEmailSchema = {
  tags: ['SentEmail'],
  body: {
    type: 'string',
    properties: {
      email: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'string',
      default: 'Mail sent.',
    },
    404: {
      description: 'Send Email error response',
      type: 'string',
      errorMsg: {
        type: 'string',
        default: 'Error on sending mail',
      },
    },
  },
};

export {
  // eslint-disable-next-line import/prefer-default-export
  sentEmailSchema,
};
