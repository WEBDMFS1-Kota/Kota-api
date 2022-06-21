const signInSchema = {
  description: 'Sign in',
  tags: ['Users'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['email', 'password'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  },
};

const postUserSchema = {
  description: 'Add an user',
  tags: ['Users'],
  body: {
    type: 'object',
    properties: {
      pseudo: { type: 'string' },
      avatar: { type: 'string' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      password: { type: 'string' },
      email: { type: 'string' },
      birthDate: { type: 'string' },
      githubProfileURL: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        pseudo: { type: 'string' },
        avatar: { type: 'string' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
        birthDate: { type: 'string' },
        githubProfileURL: { type: 'string' },
      },
    },
  },
};

const getUserSchema = {
  description: 'Get an user with his ID',
  tags: ['Users'],
  query: {
    pseudo: { type: 'string' },
    email: { type: 'string' },
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          pseudo: { type: 'string' },
          avatar: { type: 'string' },
          firstname: { type: 'string' },
          lastname: { type: 'string' },
          password: { type: 'string' },
          email: { type: 'string' },
          birthDate: { type: 'string' },
          githubProfileURL: { type: 'string' },
        },
      },
    },
  },
};

const patchUserSchema = {
  description: 'Update user data with his ID',
  tags: ['Users'],
  body: {
    type: 'object',
    properties: {
      pseudo: { type: 'string' },
      avatar: { type: 'string' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      password: { type: 'string' },
      email: { type: 'string' },
      birthDate: { type: 'string' },
      githubProfileURL: { type: 'string' },
    },
  },
  params: {
    id: { type: 'number' },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        pseudo: { type: 'string' },
        avatar: { type: 'string' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
        birthDate: { type: 'string' },
        githubProfileURL: { type: 'string' },
      },
    },
  },
};

const deleteUserSchema = {
  description: 'Delete an user with his ID',
  tags: ['Users'],
  query: {
    id: {
      type: 'number',
      description: 'ID of the user',
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        pseudo: { type: 'string' },
        avatar: { type: 'string' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
        birthDate: { type: 'string' },
        githubProfileURL: { type: 'string' },
      },
    },
  },
};

const patchUserVote = {
  description: 'Add vote from an user to a project',
  tags: ['Users', 'Projects'],
  body: {
    type: 'object',
    properties: {
      value: { type: 'number' },
    },
  },
  params: {
    idProject: { type: 'number' },
  },
  response: {
    200: {
      description: 'Unsuccessful response',
      type: 'string',
      default: 'You already voted that.',
    },
  },
};

const getUserProjectsSchema = {
  description: 'Get all the projects of an user',
  tags: ['Users', 'Projects'],
  params: {
    userId: { type: 'number' },
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          title: { type: 'string' },
          projectUrl: { type: 'string' },
          description: { type: 'string' },
          publishDate: { type: 'string' },
          image: { type: 'string' },
          upVote: { type: 'number' },
          downVote: { type: 'number' },
          usersVotes: { type: 'number' },
        },
      },
    },
  },
};

export {
  postUserSchema,
  getUserSchema,
  patchUserSchema,
  deleteUserSchema,
  patchUserVote,
  getUserProjectsSchema,
  signInSchema,
};
