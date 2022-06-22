const getTagsSchema = {
  description: 'Get tags by his name',
  tags: ['Tags'],
  query: {
    name: {
      type: 'string',
      description: 'Name of the tag',
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
        },
      },
    },
    404: {
      description: 'Get Tags not found response',
      type: 'array',
      errorMsg: {
        type: 'string',
        default: 'No Tags found',
      },
    },
  },
};

const getUserTagsSchema = {
  description: 'Get all tags of an user',
  tags: ['Tags', 'Users'],
  query: {
    userId: {
      type: 'string',
      description: 'ID of the user',
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
        },
      },
    },
    404: {
      description: 'Get User Tag not found response',
      type: 'array',
      errorMsg: {
        type: 'string',
        default: 'User Tag not found',
      },
    },
  },
};

const postUserTagsSchema = {
  security: [{ bearerAuth: [] }],
  description: 'Add tags to an user',
  tags: ['Tags', 'Users'],
  query: {
    userId: {
      type: 'string',
      description: 'ID of the user',
    },
  },
  body: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of the tag',
        },
      },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
        },
      },
    },
    404: {
      description: 'Post User Tag adding failed response',
      type: 'object',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'Adding failed',
        },
      },
    },
  },
};

const deleteUserTagsSchema = {
  security: [{ bearerAuth: [] }],
  description: 'Delete a tag of an user',
  tags: ['Tags', 'Users'],
  query: {
    userId: {
      type: 'string',
      description: 'ID of the user',
    },
  },
  body: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of the tag',
        },
      },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
        },
      },
    },
    404: {
      description: 'Delete User Tag error response',
      type: 'array',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'Delete Tag failed',
        },
      },
    },
  },
};

export {
  getTagsSchema,
  getUserTagsSchema,
  postUserTagsSchema,
  deleteUserTagsSchema,
};
