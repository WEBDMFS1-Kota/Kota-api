import { getProjectById } from '../../services/project/projectService';
import {
  getProjectTagsByProjectId,
  getProjectTagByProjectIdAndTagId,
  addProjectTag,
  deleteProjectTag,
} from '../../services/projectTag/projectTagService';

import { getTagById, getTagsById } from '../../services/tag/tagService';

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
        const projectId = Number(request.params.projectId);
        const { body } = request;
        const project = await getProjectById(projectId);
        const addedTags: any[] = [];
        const nonAddedTags: any[] = [];
        if (!project) {
          return response.status(404).send();
        }
        if (project.projectsUsers[0].userId !== request.user.userId) {
          return response.status(403).send({
            errorMsg: "Can't access a resource you don't own.",
          });
        }
        await Promise.all(body.map(async (tag: any) => {
          const id = Number(tag.id);
          console.log('FUCKING ID', id);
          const identifiedTag: any = (await getTagById(id));
          console.log('identifiedTag', identifiedTag);
          const tagId = identifiedTag.id;
          const checkProjectTag = await getProjectTagByProjectIdAndTagId(projectId, tagId);
          console.table(checkProjectTag);
          if (checkProjectTag[0]) {
            nonAddedTags.push(identifiedTag.name);
            console.log('nonAddedTags', nonAddedTags);
          } else {
            console.log('FUCKING ELSE');
            await addProjectTag(projectId, tagId);
            addedTags.push(identifiedTag.name);
            console.log('addedTags', addedTags);
          }
        }));
        return response.status(201).send(addedTags);
      } catch (error) {
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  server.delete('/projects/:projectId/tags', {
    onRequest: [server.authenticate],
    handler: async (request: any, response: any) => {
      const { body, params } = request;
      const projectId = Number(params.projectId);
      console.log('projectId', projectId);
      const project = await getProjectById(projectId);
      console.table(project);
      if (!project) {
        return response.status(404).send();
      }
      if (project.projectsUsers[0].userId !== request.user.userId) { // Ah ! je vais regarder
        return response.status(403).send({
          errorMsg: "Can't access a resource you don't own.",
        });
      }
      const deletedTags: any[] = [];
      await Promise.all(body.map(async (tag: any) => {
        const id = Number(tag.id);
        console.log('FUCKING ID', id);
        const identifiedTag: any = (await getTagById(id));
        console.log('identifiedTag', identifiedTag);
        const tagId = Number(identifiedTag.id);
        const projectTagToDelete = (await getProjectTagByProjectIdAndTagId(projectId, tagId))[0];
        console.log('projectTagToDelete');
        console.table(projectTagToDelete);
        await deleteProjectTag(projectTagToDelete.id);
        deletedTags.push(identifiedTag.name);
      }));
      return response.status(201).send(deletedTags);
    },
  });

  done();
};
export default projectTagRoutes;
