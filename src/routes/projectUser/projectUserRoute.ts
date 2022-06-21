import { getProjectById } from '../../services/project/projectService';
import { getUserProjectsSchema } from '../../schema/userSchema';
import { getProjectsUserByUser, getProjectsUserByProject } from '../../services/projectUser/projectUserService';
import { getUserById } from '../../services/user/userService';
import { getProjectCreatorSchema } from '../../schema/projectSchema';

const ProjectUserRoutes = (server: any, opts: any, done: () => void) => {
  server.get('/users/:userId/projects', {
    schema: getUserProjectsSchema,
    handler: async (request: any, response: any) => {
      const { params, query } = request;
      try {
        const projectsUser: any[] = [];
        const projectsUserRelations = await getProjectsUserByUser(params.userId, query);
        if (!projectsUserRelations) {
          return response.status(404).send();
        }
        await Promise.all(projectsUserRelations.map(async (relation: any) => {
          const project = await getProjectById(Number(relation.projectId));
          projectsUser.push(project);
        }));
        return response.status(200).send(projectsUser);
      } catch (error) {
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  server.get('/users/:projectId/projectCreator', {
    schema: getProjectCreatorSchema,
    handler: async (request: any, response: any) => {
      const { params, query } = request;
      try {
        const { id } = query;
        const projectsUserRelations = (await getProjectsUserByProject(params.projectId, id))[0];
        if (!projectsUserRelations) {
          return response.status(404).send();
        }
        const { userId } = projectsUserRelations;
        const ownerInfos = (await getUserById(userId));
        if (ownerInfos) {
          ownerInfos.password = null;
          return response.status(200).send(ownerInfos);
        }
        return response.status(404).send();
      } catch (error) {
        return response.status(503).send({ errorMsg: error });
      }
    },
  });
  done();
};

export default ProjectUserRoutes;