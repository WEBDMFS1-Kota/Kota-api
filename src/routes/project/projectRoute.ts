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

const ProjectRoutes = (server: any, opts: any, done: () => void) => {
  server.get('/projects', {
    schema: getProjectsSchema,
    handler: async (req: any, res: any) => {
      try {
        return await getProjects();
      } catch (error: any) {
        return formatServiceError(res, error);
      }
    },
  });

  server.get('/projects/:id', {
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

  server.post('/projects', {
    onRequest: [server.authenticate],
  }, {
    schema: addProjectSchema,
    handler: async (req: any, res: any) => {
      try {
        return await addProject(req.body, req.user.userId);
      } catch (error) {
        return formatServiceError(res, error);
      }
    },
  });

  server.put('/projects/:id', {
    onRequest: [server.authenticate],
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

  server.delete('/projects/:id', {
    onRequest: [server.authenticate],
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
