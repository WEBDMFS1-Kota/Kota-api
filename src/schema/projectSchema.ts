const typeString = { type: 'string' };
const typeNumber = { type: 'number' };

const projectProperties = {
  id: typeNumber,
  title: typeString,
  projectUrl: typeString,
  shortDescription: typeString,
  description: typeString,
  publishDate: typeString,
  image: typeString,
  upVote: typeNumber,
  downVote: typeNumber,
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
    404: {
      description: 'No Projects found response',
      type: 'null',
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
      type: 'null',
    },
  },
};

const addProjectSchema = {
  security: [{ bearerAuth: [] }],
  tags: ['Projects'],
  body: {
    type: 'object',
    properties: projectProperties,
  },
  response: {
    201: {
      type: 'object',
      properties: projectProperties,
    },
    404: {
      description: 'Adding project failed response',
      type: 'null',
    },
  },
};

const updateProjectSchema = {
  description: 'Update a project with his ID',
  security: [{ bearerAuth: [] }],
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
      type: 'null',
    },
  },
};

const deleteProjectSchema = {
  security: [{ bearerAuth: [] }],
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
      type: 'null',
      description: 'Project not found response',
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
    404: {
      type: 'null',
      description: 'Top Project not found response',
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
    404: {
      type: 'null',
      description: 'Hot Project not found response',
    },
  },
};

const getProjectCreatorSchema = {
  description: 'Get the creator of a project with his ID',
  tags: ['Users', 'Projects'],
  params: {
    projectId: { type: 'number' },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        pseudo: { type: 'string' },
        avatar: { type: 'string' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        email: { type: 'string' },
        birthDate: { type: 'string' },
        githubProfileURL: { type: 'string' },
        description: { type: 'string' },
      },
    },
    404: {
      type: 'null',
      description: 'Project Creator by Id not found response',
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
  getProjectCreatorSchema,
};
