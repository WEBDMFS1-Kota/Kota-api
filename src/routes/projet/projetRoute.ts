import {
  getProjetsSchema,
  addProjetSchema,
  getProjetByIdSchema,
  updateProjetSchema,
  deleteProjetSchema,
} from '../../schema/projetSchema';

import {
  addProjet,
  getProjets,
  getProjetById,
  updateProjet,
  deleteProjet,
} from '../../services/projet/projetService';

const projetRoutes = (fastify: any, opts: any, done: () => void) => {
  fastify.get('projects', {
    schema: getProjetsSchema,
    handler: getProjets,
  });

  fastify.get('projects/:id', {
    schema: getProjetByIdSchema,
    handler: getProjetById,
  });

  fastify.post('projects/', {
    schema: addProjetSchema,
    handler: addProjet,
  });

  fastify.put('projects/:id', {
    schema: updateProjetSchema,
    handler: updateProjet,
  });

  fastify.delete('projects/:id', {
    schema: deleteProjetSchema,
    handler: deleteProjet,
  });

  done();
};

export default projetRoutes;
