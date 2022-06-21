import {
  addProjectTag,
  getProjectTags,
  getProjectTagsByProject,
  deleteProjectTag,
  findProjectTagRelation,
} from '../../services/projectTag/projectTagService';
import {
  addProjectTagSchema, getProjectTagsSchema,
  getProjectTagsByProjetSchema, deleteProjectTagSchema,
} from '../../schema/projectTagSchema';

const projectTagRoutes = (fastify: any, opts: any, done: () => void) => {
  fastify.get('/projects/tags', {
    shema: getProjectTagsSchema,
    handler: async (req: any, res: any) => {
      try {
        return await getProjectTags();
      } catch (error) {
        return res.status(503).send({ errorMsg: error });
      }
    },
  });

  fastify.get('/projects/tags/:projectId', {
    shema: getProjectTagsByProjetSchema,
    handler: async (req: any, res: any) => {
      try {
        return await getProjectTagsByProject(req.params.projectId);
      } catch (error) {
        return res.status(404).send('No project found');
      }
    },
  });

  fastify.post('/projects/tags', {
    shema: addProjectTagSchema,
    handler: async (req: any, res: any) => {
      const requestBodies = [].concat(req.body); // Traite une liste dans tous les cas
      try {
        return await addProjectTag(requestBodies);
      } catch (error) {
        return res.status(503).send({ errorMsg: error });
      }
    },
  });

  fastify.delete('/projects/tags/:projectId', {
    shema: deleteProjectTagSchema,
    handler: async (req: any, res: any) => {
      const { body, params } = req;
      try {
        const relation = (await findProjectTagRelation(params, body))[0];
        if (relation) {
          await deleteProjectTag(relation);
          return res.status(204).send();
        }
        return res.status(404).send();
      } catch (error) {
        return res.status(503).send({ errorMsg: error });
      }
    },
  });

  done();
};
export default projectTagRoutes;
