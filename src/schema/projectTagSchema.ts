const typeNumber = { type: 'number' };

const projectTagProperties = {
  id: typeNumber,
  projectId: typeNumber,
  tagId: typeNumber,
};

const ProjectTag = {
  type: 'object',
  properties: projectTagProperties,
};

const getProjectTagsSchema = {
  response: {
    200: {
      type: 'array',
      items: ProjectTag,
    },
    404: {
      type: 'array',
      description: 'Project Tag list not found response',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'No Project Tag List found',
        },
      },
    },
  },
};

const getProjectTagsByProjetSchema = {
  params: {
    projectId: typeNumber,
  },
  response: {
    200: {
      description: 'Get Project Tag by id',
      type: 'array',
      items: ProjectTag,
    },
    404: {
      description: 'Get Project Tag by id not found response',
      type: 'array',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'Project Tag by not found with id {id}',
        },
      },
    },
  },
};

const addProjectTagSchema = {
  body: [{
    type: 'object',
    properties: {
      name: 'string',
      projectId: typeNumber,
    },
  }, {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: 'string',
        projectId: typeNumber,
      },
    },
  }],
  response: {
    201: {
      type: 'object',
      properties: projectTagProperties,
    },
    404: {
      description: 'Add Project Tag failed response',
      type: 'object',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'Add failed',
        },
      },
    },
  },
};

const deleteProjectTagSchema = {
  params: {
    projectId: { type: 'number' },
  },
  body: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    204: {
      type: 'null',
      description: 'No Content',
    },
    404: {
      type: 'null',
      description: 'Delete Project Tag response',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'Delete failed',
        },
      },
    },
  },
};

export {
  getProjectTagsSchema,
  getProjectTagsByProjetSchema,
  addProjectTagSchema,
  deleteProjectTagSchema,
};