import {
  addProjectTag,
  getProjectTags,
  getProjectTagsByProject,
  deleteProjectTag,
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
      const { projectId } = req.params;
      try {
        return await deleteProjectTag(projectId);
      } catch (error) {
        return res.status(404).send('Tag non existant');
      }
    },
  });

  done();
};
export default projectTagRoutes;