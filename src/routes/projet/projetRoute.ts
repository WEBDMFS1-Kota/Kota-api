import {
  getProjetsSchema,
  addProjetSchema,
  // getProjetSchema,
  // updateProjetSchema,
  // deleteProjetSchema,
} from '../../schema/projetSchema';

import {
  addProjet,
  getProjets,
} from '../../services/projet/projetService';

const projetRoutes = (fastify: any, opts: any, done: () => void) => {
  fastify.get('/api/projet', {
    schema: getProjetsSchema,
    handler: getProjets,
  });
  fastify.post('/api/projet/add', {
    schema: addProjetSchema,
    handler: addProjet,
  });

  console.log('typeof done:', (typeof done), JSON.stringify(done));
  done();
};

export default projetRoutes;
