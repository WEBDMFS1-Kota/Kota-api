const getProjectTagsByProjectIdSchema = {
  description: 'Get all tags of a Project',
  tags: ['ProjectTags'],
  params: {
    projectId: {
      type: 'number',
      description: 'ID of the project',
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

const postProjectTagsSchema = {
  security: [{ bearerAuth: [] }],
  description: 'Add tags to a Project',
  tags: ['ProjectTags'],
  params: {
    projectId: {
      type: 'number',
      description: 'ID of the project',
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

const deleteProjectTagsSchema = {
  security: [{ bearerAuth: [] }],
  description: 'Delete a tag of an Project',
  tags: ['ProjectTags'],
  params: {
    projectId: {
      type: 'number',
      description: 'ID of the project',
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
  getProjectTagsByProjectIdSchema,
  postProjectTagsSchema,
  deleteProjectTagsSchema,
};
