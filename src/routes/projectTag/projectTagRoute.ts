import { formatServiceError } from '../../services/error';
import {
  addProjectTag,
  getProjectTags,
  deleteProjectTag,
} from '../../services/projectTag/projectTagService';// getProjectTagById, deleteProjectTag;
import { getTagsById, getTagsByName } from '../../services/tag/tagService';
import { addProjectTagSchema, getProjectTagsSchema, deleteProjectTagSchema } from '../../schema/projectTagSchema';

const projectTagRoutes = (fastify: any, opts: any, done: () => void) => {
  fastify.get('/project/tags', {
    shema: getProjectTagsSchema,
    handler: async (req: any, res: any) => {
      try {
        const projectTagsRelations = await getProjectTags(req);
        const projectTags: any[] = [];
        projectTagsRelations.map(async (projectTagsRelation) => {
          const tagId = await getTagsById(projectTagsRelation);
          projectTags.push(tagId);
        });
        return projectTags;
      } catch (error) {
        return formatServiceError(res, error);
      }
    },
  });

  // possibilité d'ajouter un à la fois, ou plusieurs ?
  // pas fini
  fastify.post('/project/tags', {
    shema: addProjectTagSchema,
    handler: async (req: any, res: any) => {
      const addTags: any[] = [];
      const nonAddedTags: any[] = [];
      try {
        if (req.body[0]) {
          await req.body.map(async (tag: any) => {
            const identifiedTag: any = (await getTagsByName(tag))[0];
            const checkProjectTags: any = await getProjectTags(req.query);
            if (checkProjectTags[0]) {
              nonAddedTags.push(identifiedTag.name);
            } else {
              const updateProjectTags = await addProjectTag(req.query, identifiedTag);
              addTags.push(identifiedTag.name);
            }
          });
        }
        return await addProjectTag(req.body, req.query.projectTagId);
      } catch (error) {
        return formatServiceError(res, error);
      }
    },
  });

  // Pas fini
  fastify.delete('/project/tags', {
    shema: deleteProjectTagSchema,
    handler: async (req: any, res: any) => {
      try {
        return await deleteProjectTag(req.query.projectTagId);
      } catch (error) {
        return formatServiceError(res, error);
      }
    },
  });

  done();
};
export default projectTagRoutes;