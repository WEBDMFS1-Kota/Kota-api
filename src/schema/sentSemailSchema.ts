const forgotPasswordSchema = {
  tags: ['SentEmail'],
  body: {
    email: { type: 'string' },
    pseudo: { type: 'string' },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'string',
      default: 'Mail sent.',
    },
    404: {
      description: 'Send Email error response',
      type: 'null',
    },
  },
};

const resetPasswordSchema = {
  tags: ['SentEmail'],
  body: {
    token: { type: 'string' },
    password: { type: 'string' },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'string',
      default: '',
    },
    401: {
      description: 'Bad user response',
      type: 'null',
    },
    403: {
      description: 'Bad token response',
      type: 'null',
    },
    503: {
      description: 'Error when sending email',
      type: 'null',
    },
  },
};

export {
  forgotPasswordSchema,
  resetPasswordSchema,
};
