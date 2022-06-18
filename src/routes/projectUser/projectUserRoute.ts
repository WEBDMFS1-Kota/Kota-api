import { getProjectById } from '../../services/project/projectService';
import { getProjectsUser } from '../../services/projectUser/projectUserService';

const ProjectUserRoutes = (server: any, opts: any, done: () => void) => {
  server.get('/users/:userId/projects', async (request: any) => {
    const { params, query } = request;
    try {
      const projectsUser: any[] = [];
      const projectsUserRelations = await getProjectsUser(params.userId, query);
      await Promise.all(projectsUserRelations.map(async (relation) => {
        const project = await getProjectById(Number(relation.projectId));
        projectsUser.push(project);
      }));
      return projectsUser;
    } catch (error) {
      return error;
    }
  });
  done();
};

export default ProjectUserRoutes;
