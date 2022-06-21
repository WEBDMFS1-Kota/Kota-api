const typeNumber = { type: 'number' };

// Common
const projectTagProperties = {
  id: typeNumber,
  projectId: typeNumber,
  tagId: typeNumber,
};

const ProjectTag = {
  type: 'object',
  properties: projectTagProperties,
};

// Schema
const getProjectTagsSchema = {
  response: {
    200: {
      type: 'array',
      items: ProjectTag,
    },
  },
};

const getProjectTagsByProjetSchema = {
  params: {
    projectId: typeNumber,
  },
  response: {
    200: {
      type: 'array',
      items: ProjectTag,
    },
  },
};

const addProjectTagSchema = {
  security: [{ bearerAuth: [] }],
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
  },
};

const deleteProjectTagSchema = {
  security: [{ bearerAuth: [] }],
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
  },
};

export {
  getProjectTagsSchema,
  getProjectTagsByProjetSchema,
  addProjectTagSchema,
  deleteProjectTagSchema,
};
