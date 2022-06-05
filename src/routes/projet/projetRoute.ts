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
  fastify.get('/api/projets', {
    schema: getProjetsSchema,
    handler: getProjets,
  });

  fastify.get('/api/projets/:id', {
    schema: getProjetByIdSchema,
    handler: getProjetById,
  });

  fastify.post('/api/projets/add', {
    schema: addProjetSchema,
    handler: addProjet,
  });

  fastify.put('/api/projets/edit/:id', {
    schema: updateProjetSchema,
    handler: updateProjet,
  });

  fastify.delete('/api/projets/delete/:id', {
    schema: deleteProjetSchema,
    handler: deleteProjet,
  });

  done();
};

export default projetRoutes;
