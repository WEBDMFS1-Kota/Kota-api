const typeString = { type: 'string' };

const sentEmailSchema = {
  tags: ['SentEmail'],
  body: {
    type: 'string',
    properties: {
      email: typeString,
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'string',
      default: 'Mail sent.',
    },
  },
};

export {
  // eslint-disable-next-line import/prefer-default-export
  sentEmailSchema,
};
