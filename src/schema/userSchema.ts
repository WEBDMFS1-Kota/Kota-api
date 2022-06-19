const postUserSchema = {
  description: 'Add an user',
  tags: ['Users', 'POST'],
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
      type: 'string',
      default: 'User {pseudo} successfully created',
    },
  },
};

const getUserSchema = {
  description: 'Get an user with his ID',
  tags: ['Users', 'GET'],
  query: {
    pseudo: { type: 'string' },
    email: { type: 'string' },
  },
  response: {
    200: {
      type: 'string',
      default: 'User {pseudo} successfully created',
    },
  },
};

const patchUserSchema = {
  description: 'Update user data with his ID',
  tags: ['Users', 'PATCH'],
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
      default: 'User "pseudo" successfully updated',
    },
  },
};

const deleteUserSchema = {
  description: 'Delete an user with his ID',
  tags: ['Users', 'DELETE'],
  query: {
    id: {
      type: 'number',
      description: 'ID of the user',
    },
  },
  response: {
    200: {
      type: 'string',
      description: 'Successful response',
      default: 'User "pseudo" successfully deleted',
    },
  },
};

const patchUserVote = {
  description: 'Add vote from an user to a project',
  tags: ['Users', 'Projects', 'PATCH'],
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
      type: 'object',
      default: 'You already voted that.',
    },
  },
};

const getUserProjectsSchema = {
  description: 'Get all the projects of an user',
  tags: ['Users', 'Projects', 'GET'],
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
};