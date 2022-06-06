const typeString = { type: 'string' };
const typeNumber = { type: 'number' };

const typeProperties = {
  id: typeNumber,
  title: typeString,
  projectUrl: typeString,
  description: typeString,
  publishDate: typeString,
  image: typeString,
  upVote: typeNumber,
  usersVotes: typeNumber,
};

const projet = {
  type: 'object',
  properties: typeProperties,
};

const getProjetsSchema = {
  response: {
    200: {
      type: 'array',
      items: projet,
    },
  },
};

const getProjetByIdSchema = {
  params: {
    id: typeNumber,
  },
  response: {
    200: {
      type: 'object',
      properties: typeProperties,
    },
  },
};

const addProjetSchema = {
  body: {
    type: 'object',
    required: ['title', 'description'],
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
      properties: typeProperties,
    },
  },
};

const updateProjetSchema = {
  body: {
    type: 'object',
    required: ['title', 'description'],
    properties: typeProperties,
  },
  params: {
    id: typeNumber,
  },
  response: {
    200: {
      type: 'object',
      properties: typeProperties,
    },
  },
};

const deleteProjetSchema = {
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
  getProjetsSchema,
  getProjetByIdSchema,
  addProjetSchema,
  updateProjetSchema,
  deleteProjetSchema,
};
