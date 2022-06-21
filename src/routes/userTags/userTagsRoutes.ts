import { getTagsByName, getTagsById } from '../../services/tag/tagService';
import {
  addUserTags, getUserTag, getAllUserTags, deleteUserTag,
} from '../../services/userTags/usertagsService';
import { deleteUserTagsSchema, getUserTagsSchema, postUserTagsSchema } from '../../schema/tagsSchema';
import { getUserById } from '../../services/user/userService';

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
        const user = await getUserById(request.user.userId);
        if (!user) {
          return response.status(404).send();
        }
        if (Number(query.userId) === Number(user.id)) {
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
          return response.status(201).send(addedTags);
        }
        return response.status(403).send({
          errorMsg: "Can't access a resource you don't own.",
        });
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
        const user = await getUserById(request.user.userId);
        if (!user) {
          return response.status(404).send();
        }
        if (Number(query.userId) === Number(user.id)) {
          await Promise.all(body.map(async (tag: any) => {
            const identifiedTag = (await getTagsByName(tag))[0];
            const userTagToDelete = (await getUserTag(query, identifiedTag))[0];
            await deleteUserTag(userTagToDelete);
            deletedTags.push(identifiedTag.name);
          }));
          return response.status(201).send(deletedTags);
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

export default userTagsRoutes;