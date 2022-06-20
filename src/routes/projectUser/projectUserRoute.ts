import { getProjectById } from '../../services/project/projectService';
import { getUserProjectsSchema } from '../../schema/userSchema';
import { getProjectsUserByUser, getProjectsUserByProject } from '../../services/projectUser/projectUserService';
import { getUsers } from '../../services/user/userService';
import { getProjectCreatorSchema } from '../../schema/projectSchema';

const ProjectUserRoutes = (server: any, opts: any, done: () => void) => {
  server.get('/users/:userId/projects', {
    schema: getUserProjectsSchema,
    handler: async (request: any) => {
      const { params, query } = request;
      try {
        const projectsUser: any[] = [];
        const projectsUserRelations = await getProjectsUserByUser(params.userId, query);
        await Promise.all(projectsUserRelations.map(async (relation: any) => {
          const project = await getProjectById(Number(relation.projectId));
          projectsUser.push(project);
        }));
        return projectsUser;
      } catch (error) {
        return error;
      }
    },
  });

  server.get('/users/:projectId/projectCreator', {
    schema: getProjectCreatorSchema,
    handler: async (request: any) => {
      const { params, query } = request;
      try {
        const projectsUserRelations = (await getProjectsUserByProject(params.projectId, query))[0];
        if (projectsUserRelations === undefined) {
          return 'Wrong project ID';
        }
        const ownerInfos = (await getUsers(projectsUserRelations))[0];
        return ownerInfos;
      } catch (error) {
        return error;
      }
    },
  });
  done();
};

export default ProjectUserRoutes;
