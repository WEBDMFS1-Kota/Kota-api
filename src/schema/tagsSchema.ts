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
  },
};

const postUserTagsSchema = {
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
  },
};

const deleteUserTagsSchema = {
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
  },
};

export {
  getTagsSchema,
  getUserTagsSchema,
  postUserTagsSchema,
  deleteUserTagsSchema,
};