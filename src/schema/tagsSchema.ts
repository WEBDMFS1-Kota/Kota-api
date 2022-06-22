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
      type: 'null',
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
      type: 'null',
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
      type: 'null',
    },
  },
};

const patchUserTagsSchema = {
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
        id: {
          type: 'number',
          description: 'Id of the tag',
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
        },
      },
    },
    404: {
      description: 'Post User Tag adding failed response',
      type: 'null',
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
      type: 'null',
    },
  },
};

export {
  getTagsSchema,
  getUserTagsSchema,
  postUserTagsSchema,
  deleteUserTagsSchema,
  patchUserTagsSchema,
};
