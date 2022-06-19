const typeString = { type: 'string' };
const typeNumber = { type: 'number' };

const projectProperties = {
  id: typeNumber,
  title: typeString,
  projectUrl: typeString,
  description: typeString,
  publishDate: typeString,
  image: typeString,
  upVote: typeNumber,
  downVote: typeNumber,
  usersVotes: typeNumber,
};

const Project = {
  type: 'object',
  properties: projectProperties,
};

const getProjectsSchema = {
  tags: ['Projects'],
  response: {
    200: {
      type: 'array',
      items: Project,
    },
  },
};

const getProjectByIdSchema = {
  description: 'Get project with his ID',
  tags: ['Projects'],
  params: {
    id: {
      type: 'number',
      description: 'ID of the project',
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: projectProperties,
    },
    404: {
      description: 'Project not found response',
      type: 'object',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'Project not found with id {id}',
        },
      },
    },
  },
};

const addProjectSchema = {
  tags: ['Projects'],
  body: {
    type: 'object',
    properties: {
      title: typeString,
      projectUrl: typeString,
      description: typeString,
      image: typeString,
    },
  },
  response: {
    201: {
      type: 'object',
      properties: projectProperties,
    },
  },
};

const updateProjectSchema = {
  description: 'Update a project with his ID',
  tags: ['Projects'],
  body: {
    type: 'object',
    properties: projectProperties,
  },
  params: {
    id: typeNumber,
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: projectProperties,
    },
    404: {
      description: 'Project not found response',
      type: 'object',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'Update failed, record {id} not found',
        },
      },
    },
  },
};

const deleteProjectSchema = {
  description: 'Delete a project with his ID',
  tags: ['Projects'],
  params: {
    id: {
      type: 'number',
      description: 'ID of the project',
    },
  },
  response: {
    204: {
      type: 'null',
      description: 'Successful response',
    },
    404: {
      type: 'object',
      description: 'Project not found response',
      properties: {
        errorMsg: {
          type: 'string',
          default: 'Delete failed',
        },
      },
    },
  },
};

const getTopProjectsSchema = {
  description: 'Get top projects',
  tags: ['Projects'],
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      items: Project,
    },
  },
};

const getHotProjectsSchema = {
  description: 'Get hot projects',
  tags: ['Projects'],
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      items: Project,
    },
  },
};

export {
  getProjectsSchema,
  getProjectByIdSchema,
  addProjectSchema,
  updateProjectSchema,
  deleteProjectSchema,
  getTopProjectsSchema,
  getHotProjectsSchema,
};
