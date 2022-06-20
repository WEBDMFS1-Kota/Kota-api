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
  params: {
    id: typeNumber,
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