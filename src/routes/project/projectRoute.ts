import {
  getProjectsSchema,
  addProjectSchema,
  getProjectByIdSchema,
  updateProjectSchema,
  deleteProjectSchema,
  getTopProjectsSchema,
  getHotProjectsSchema,
} from '../../schema/projectSchema';

import { formatServiceError } from '../../services/error';

import {
  addProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getHotProjects,
  getTopProjects,
} from '../../services/project/projectService';

const ProjectRoutes = (server: any, opts: any, done: () => void) => {
  server.get('/projects', {
    schema: getProjectsSchema,
    handler: async (request: any, response: any) => {
      try {
        return await getProjects();
      } catch (error: any) {
        return formatServiceError(response, error);
      }
    },
  });

  server.get('/projects/top', {
    schema: getTopProjectsSchema,
    handler: async (request: any, response: any) => {
      try {
        return await getTopProjects();
      } catch (error: any) {
        return formatServiceError(response, error);
      }
    },
  });

  server.get('/projects/hot', {
    schema: getHotProjectsSchema,
    handler: async (request: any, response: any) => {
      try {
        return await getHotProjects();
      } catch (error: any) {
        return formatServiceError(response, error);
      }
    },
  });

  server.get('/projects/:id', {
    schema: getProjectByIdSchema,
    handler: async (request: any, response: any) => {
      try {
        const { id } = request.params;
        const project = await getProjectById(id);
        if (project) {
          return response.status(200).send(project);
        }
        return response.status(404).send();
      } catch (error) {
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  server.post('/projects', {
    onrequestuest: [server.authenticate],
    schema: addProjectSchema,
    handler: async (request: any, response: any) => {
      try {
        return await addProject(request.body, request.user.userId);
      } catch (error) {
        return formatServiceError(response, error);
      }
    },
  });

  server.put('/projects/:id', {
    onrequestuest: [server.authenticate],
    schema: updateProjectSchema,
    handler: async (request: any, response: any) => {
      try {
        const { id } = request.params;
        const project = await getProjectById(id);
        if (!project) {
          return response.status(404).send();
        } if (project.projectsUsers[0].userId === request.user.userId) {
          return response.status(200).send(await updateProject(id, request.body));
        }
        return response.status(403).send({
          errorMsg: "Can't access a resource you don't own.",
        });
      } catch (error) {
        return formatServiceError(response, error);
      }
    },
  });

  server.delete('/projects/:id', {
    onrequestuest: [server.authenticate],
    schema: deleteProjectSchema,
    handler: async (request: any, response: any) => {
      try {
        const { id } = request.params;
        const project = await getProjectById(id);
        if (!project) {
          return response.status(404).send();
        } if (project.projectsUsers[0].userId === request.user.userId) {
          return response.status(204).send(await deleteProject(id));
        }
        return response.status(403).send({
          errorMsg: "Can't access a resource you don't own.",
        });
      } catch (error) {
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  done();
};

export default ProjectRoutes;
