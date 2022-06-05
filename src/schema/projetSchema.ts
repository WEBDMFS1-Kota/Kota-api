const typeString = { type: 'string' };
const typeNumber = { type: 'number' };
const typeObject = { type: 'object' };

const typeProperties = {
  id: typeNumber,
  title: typeString,
  projectUrl: typeString,
  description: typeString,
  publishDate: typeObject,
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
    200: projet,
  },
};

const addProjetSchema = {
  body: {
    type: 'object',
    required: ['title', 'description'],
    properties: {
      title: typeString,
      description: typeString,
    },
  },
  response: {
    200: typeString,
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
    200: typeString,
  },
};

const deleteProjetSchema = {
  params: {
    id: typeNumber,
  },
  response: {
    200: typeString,
  },
};

export {
  getProjetsSchema,
  getProjetByIdSchema,
  addProjetSchema,
  updateProjetSchema,
  deleteProjetSchema,
};
