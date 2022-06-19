const typeNumber = { type: 'number' };

const projectTagProperties = {
  id: typeNumber,
  projectId: typeNumber,
  tagId: typeNumber,
  projects: typeNumber,
  tags: typeNumber,
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
  },
};

const addProjectTagSchema = {
  body: {
    type: 'object',
    properties: {
      projectTagProperties,
    },
  },
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
  addProjectTagSchema,
  deleteProjectTagSchema,
};