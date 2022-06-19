const typeString = { type: 'string' };
const typeNumber = { type: 'number' };
const typeArray = { type: 'array' };

const projectProperties = {
  id: typeNumber,
  title: typeString,
  projectUrl: typeString,
  description: typeString,
  publishDate: typeString,
  image: typeString,
  upVote: typeNumber,
  downVote: typeNumber,
  projectTag: typeArray,
  projectsUsers: typeArray,
  usersVotes: typeNumber,
};

const Project = {
  type: 'object',
  properties: projectProperties,
};

const getProjectsSchema = {
  response: {
    200: {
      type: 'array',
      items: Project,
    },
  },
};

const getProjectByIdSchema = {
  params: {
    id: typeNumber,
  },
  response: {
    200: {
      type: 'object',
      properties: projectProperties,
    },
  },
};

const addProjectSchema = {
  body: {
    type: 'object',
    properties: {
      title: typeString,
      projectUrl: typeString,
      description: typeString,
      image: typeString,
      projectTag: typeArray,
      projectsUsers: typeArray,
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
  body: {
    type: 'object',
    properties: projectProperties,
  },
  params: {
    id: typeNumber,
  },
  response: {
    200: {
      type: 'object',
      properties: projectProperties,
    },
  },
};

const deleteProjectSchema = {
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
  getProjectsSchema,
  getProjectByIdSchema,
  addProjectSchema,
  updateProjectSchema,
  deleteProjectSchema,
};