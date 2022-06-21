const signInSchema = {
  description: 'Sign in',
  tags: ['Users'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      rememberMe: { type: 'boolean' },
    },
    required: ['email', 'password', 'rememberMe'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
    401: {
      description: 'Invalid credentials',
      type: 'object',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'Invalid credentials.',
        },
      },
    },
  },
};

const signUpSchema = {
  description: 'Sign up',
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
      rememberMe: { type: 'boolean' },
    },
    required: ['email', 'password', 'pseudo', 'rememberMe'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
    409: {
      description: 'Pseudo or email already taken.',
      type: 'object',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'Either your pseudo or the email is already taken.',
        },
      },
    },
    503: {
      description: 'Internal Server Error',
      type: 'object',
      properties: {
        errorMsg: {
          type: 'string',
        },
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
    404: {
      description: 'Post User error response',
      type: 'object',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'Post failed',
        },
      },
    },
  },
};

const getUserSchema = {
  description: 'Get an user with his ID',
  tags: ['Users'],
  query: {
    id: { type: 'number' },
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
    404: {
      description: 'Get User error response',
      type: 'object',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'Get user failed',
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
    404: {
      description: 'Patch User error response',
      type: 'object',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'Patch failed',
        },
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
    404: {
      description: 'Delete User failed response',
      type: 'object',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'Delete user failed',
        },
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
    404: {
      description: 'Adding vote from an user failed response',
      type: 'string',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'Adding vote failed',
        },
      },
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
    404: {
      description: 'Get User projects failed response',
      type: 'array',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'No projects found',
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
  signUpSchema,
};
