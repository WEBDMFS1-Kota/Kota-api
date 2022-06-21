import { getProjectById } from '../../services/project/projectService';
import {
  getProjectTagsByProjectId,
  getProjectTagByProjectIdAndTagId,
  addProjectTag,
} from '../../services/projectTag/projectTagService';

import { getTagsById, getTagsByName } from '../../services/tag/tagService';

const projectTagRoutes = (server: any, opts: any, done: () => void) => {
  server.get('/projects/:projectId/tags', {
    handler: async (request: any, response: any) => {
      try {
        const { projectId } = request.params.projectId;
        const projectTagRelations = await getProjectTagsByProjectId(projectId);
        const projectTags: any[] = [];
        await Promise.all(projectTagRelations.map(async (projectTagRelation: any) => {
          const tag = await getTagsById(projectTagRelation);
          projectTags.push(tag);
        }));
        return response.status(200).send(projectTags);
      } catch (error) {
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  server.post('/projects/:projectId/tags', {
    onRequest: [server.authenticate],
    handler: async (request: any, response: any) => {
      try {
        const { projectId } = request.params.projectId;
        const { body } = request;
        const project = await getProjectById(projectId);
        const addedTags: any[number] = [];
        if (!project) {
          return response.status(404).send();
        }
        if (project.projectsUsers[0].userId !== request.user.userId) {
          return response.status(403).send({
            errorMsg: "Can't access a resource you don't own.",
          });
        }
        await Promise.all(body.map(async (tag: any) => {
          const identifiedTag: any = (await getTagsByName(tag))[0];
          const existingTag = (await
          getProjectTagByProjectIdAndTagId(projectId, identifiedTag.id)) !== [];
          if (!existingTag) {
            await addProjectTag(projectId, identifiedTag.id);
            addedTags.push(identifiedTag.id);
          }
        }));
        return response.status(201).send(addedTags);
      } catch (error) {
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  done();
};
export default projectTagRoutes;
