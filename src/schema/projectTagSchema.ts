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
    404: {
      description: 'Get Project Tag by id not found response',
      type: 'null',
    },
  },
};

const patchProjectTagsSchema = {
  security: [{ bearerAuth: [] }],
  description: 'Set project tags',
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
        id: {
          type: 'number',
          description: 'Id of the tag',
        },
      },
    },
  },
  response: {
    201: {
      description: 'Successful response',
      type: 'array',
      items: {
        type: 'number',
      },
    },
    404: {
      description: 'Add Project Tag failed response',
      type: 'null',
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
    201: {
      description: 'Successful response',
      type: 'array',
      items: {
        type: 'string',
      },
    },
    404: {
      description: 'Add Project Tag failed response',
      type: 'null',
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
    201: {
      description: 'Successful response',
      type: 'array',
      items: {
        type: 'string',
      },
    },
    404: {
      type: 'null',
      description: 'Delete Project Tag response',
    },
  },
};

export {
  getProjectTagsByProjectIdSchema,
  postProjectTagsSchema,
  deleteProjectTagsSchema,
  patchProjectTagsSchema,
};
