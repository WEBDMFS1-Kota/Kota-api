import { getTagsByName, getTagsById } from '../../services/tag/tagService';
import {
  addUserTags, getUserTag, getAllUserTags, deleteUserTag,
} from '../../services/userTags/usertagsService';
import { deleteUserTagsSchema, getUserTagsSchema, postUserTagsSchema } from '../../schema/tagsSchema';

const userTagsRoutes = (server: any, opts: any, done: () => void) => {
  server.get('/users/tags', {
    schema: getUserTagsSchema,
    handler: async (request: any, response: any) => {
      const { query } = request;
      try {
        const userTagsRelations = await getAllUserTags(query);
        const userTags: any[] = [];
        await Promise.all(userTagsRelations.map(async (userTagRelation: any) => {
          const tagId = await getTagsById(userTagRelation);
          userTags.push(tagId);
        }));
        return response.status(200).send(userTags);
      } catch (error) {
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  server.post('/users/tags', {
    onRequest: [server.authenticate],
    schema: postUserTagsSchema,
    handler: async (request: any, response: any) => {
      const { query, body } = request;
      const addedTags: any[] = [];
      const nonAddedTags: any[] = [];
      try {
        if (body[0]) {
          await Promise.all(body.map(async (tag: any) => {
            const identifiedTag: any = (await getTagsByName(tag))[0];
            const checkUserTags: any = await getUserTag(query, identifiedTag);
            if (checkUserTags[0]) {
              nonAddedTags.push(identifiedTag.name);
            } else {
              await addUserTags(query, identifiedTag);
              addedTags.push(identifiedTag.name);
            }
          }));
        } else {
          const identifiedTag: any = (await getTagsByName(body))[0];
          const checkUserTags: any = await getUserTag(query, identifiedTag);
          if (checkUserTags[0]) {
            return response.status(409).send({ errorMsg: `User already has the "${identifiedTag.name}" tag.` });
          }
          const updatedUserTags = await addUserTags(query, identifiedTag);
          return response.status(201).send(updatedUserTags);
        }
        return response.status(201).send(addedTags);
      } catch (error) {
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  server.delete('/users/tags', {
    onRequest: [server.authenticate],
    schema: deleteUserTagsSchema,
    handler: async (request: any, response: any) => {
      const { query, body } = request;
      const deletedTags: any[] = [];
      try {
        if (body[0]) {
          await Promise.all(body.map(async (tag: any) => {
            const identifiedTag = (await getTagsByName(tag))[0];
            const userTagToDelete = (await getUserTag(query, identifiedTag))[0];
            await deleteUserTag(userTagToDelete);
            deletedTags.push(identifiedTag.name);
          }));
        } else {
          const identifiedTag = (await getTagsByName(body))[0];
          const userTagToDelete = (await getUserTag(query, identifiedTag))[0];
          await deleteUserTag(userTagToDelete);
          return response.status(204).send();
        }
        return response.status(204).send();
      } catch (error) {
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  done();
};

export default userTagsRoutes;