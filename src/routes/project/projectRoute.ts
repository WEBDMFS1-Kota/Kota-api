import {
  getProjectsSchema,
  addProjectSchema,
  getProjectByIdSchema,
  updateProjectSchema,
  deleteProjectSchema,
} from '../../schema/projectSchema';

import { formatServiceError } from '../../services/error';

import {
  addProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../../services/project/projectService';

const ProjectRoutes = (fastify: any, opts: any, done: () => void) => {
  fastify.get('/projects', {
    schema: getProjectsSchema,
    handler: async (req: any, res: any) => {
      try {
        return await getProjects();
      } catch (error: any) {
        return formatServiceError(res, error);
      }
    },
  });

  fastify.get('/projects/:id', {
    schema: getProjectByIdSchema,
    handler: async (req: any, res: any) => {
      try {
        const { id } = req.params;
        return await getProjectById(id);
      } catch (error) {
        return formatServiceError(res, error);
      }
    },
  });

  fastify.post('/projects', {
    schema: addProjectSchema,
    handler: async (req: any, res: any) => {
      try {
        return await addProject(req.body, req.query.userId);
      } catch (error) {
        return formatServiceError(res, error);
      }
    },
  });

  fastify.put('/projects/:id', {
    schema: updateProjectSchema,
    handler: async (req: any, res: any) => {
      try {
        const { id } = req.params;
        return await updateProject(id, req.body);
      } catch (error) {
        return formatServiceError(res, error);
      }
    },
  });

  fastify.delete('/projects/:id', {
    schema: deleteProjectSchema,
    handler: async (req: any, res: any) => {
      try {
        const { id } = req.params;
        return await deleteProject(id);
      } catch (error) {
        return formatServiceError(res, error);
      }
    },
  });

  done();
};

export default ProjectRoutes;