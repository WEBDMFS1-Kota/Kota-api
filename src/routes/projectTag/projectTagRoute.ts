import {
  deleteProjectTagsSchema, getProjectTagsByProjectIdSchema, postProjectTagsSchema,
  patchProjectTagsSchema,
} from '../../schema/projectTagSchema';
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
    schema: getProjectTagsByProjectIdSchema,
    handler: async (request: any, response: any) => {
      try {
        const projectId = Number(request.params.projectId);
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

  server.patch('/projects/:projectId/tags', {
    onRequest: [server.authenticate],
    schema: patchProjectTagsSchema,
    handler: async (request: any, response: any) => {
      try {
        const projectId = Number(request.params.projectId);
        const { body } = request;
        const project = await getProjectById(projectId);
        const setTags: any[] = [];
        if (!project) {
          return response.status(404).send();
        }
        if (project.projectsUsers[0].userId !== request.user.userId) {
          return response.status(403).send({
            errorMsg: "Can't access a resource you don't own.",
          });
        }
        const projectTagRelations = await getProjectTagsByProjectId(projectId);
        const projectTagsId: any[] = [];
        projectTagRelations.forEach((tag: any) => {
          projectTagsId.push(tag.tagId);
        });
        const bodyTagsId: any[] = [];
        body.forEach((tag: any) => {
          bodyTagsId.push(tag.id);
        });
        const tagsToBeHere: any[] = [];
        const tagsNotToBeHere: any[] = [];
        projectTagsId.forEach(async (tagId: any) => {
          if (bodyTagsId.includes(tagId) === true) {
            tagsToBeHere.push(tagId);
            setTags.push(Number(tagId));
          } else {
            tagsNotToBeHere.push(tagId);
          }
        });
        tagsToBeHere.forEach((tagId) => {
          const index = bodyTagsId.indexOf(tagId);
          if (index !== -1) {
            bodyTagsId.splice(index, index + 1);
          }
        });
        await Promise.all(bodyTagsId.map(async (remainingTagId: any) => {
          if (await getTagById(remainingTagId)) {
            setTags.push(Number(remainingTagId));
            await addProjectTag(projectId, remainingTagId);
          }
        }));
        await Promise.all(tagsNotToBeHere.map(async (extraTagId:any) => {
          const relation = (await getProjectTagByProjectIdAndTagId(projectId, extraTagId))[0];
          await deleteProjectTag(relation.id);
        }));
        return response.status(201).send(setTags);
      } catch (error) {
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  server.post('/projects/:projectId/tags', {
    onRequest: [server.authenticate],
    schema: postProjectTagsSchema,
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
          const identifiedTag: any = (await getTagById(id));
          const tagId = identifiedTag.id;
          const checkProjectTag = await getProjectTagByProjectIdAndTagId(projectId, tagId);
          if (checkProjectTag[0]) {
            nonAddedTags.push(identifiedTag.name);
          } else {
            await addProjectTag(projectId, tagId);
            addedTags.push(identifiedTag.name);
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
    schema: deleteProjectTagsSchema,
    handler: async (request: any, response: any) => {
      const { body, params } = request;
      const projectId = Number(params.projectId);
      const project = await getProjectById(projectId);
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
        const identifiedTag: any = (await getTagById(id));
        const tagId = Number(identifiedTag.id);
        const projectTagToDelete = (await getProjectTagByProjectIdAndTagId(projectId, tagId))[0];
        if (projectTagToDelete) {
          await deleteProjectTag(projectTagToDelete.id);
          deletedTags.push(identifiedTag.name);
        }
      }));
      return response.status(201).send(deletedTags);
    },
  });

  done();
};
export default projectTagRoutes;
