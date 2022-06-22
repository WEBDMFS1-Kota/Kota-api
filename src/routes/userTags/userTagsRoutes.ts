import { getTagsByName, getTagsById, getTagById } from '../../services/tag/tagService';
import {
  addUserTags, getUserTag, getAllUserTags, deleteUserTag,
} from '../../services/userTags/usertagsService';
import {
  deleteUserTagsSchema, getUserTagsSchema, postUserTagsSchema,
  patchUserTagsSchema,
} from '../../schema/tagsSchema';
import { getUserById } from '../../services/user/userService';

const userTagsRoutes = (server: any, opts: any, done: () => void) => {
  server.get('/users/tags', {
    schema: getUserTagsSchema,
    handler: async (request: any, response: any) => {
      const { query } = request;
      try {
        const userTagsRelations = await getAllUserTags(query.userId);
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
        const user = await getUserById(query.userId);
        if (!user) {
          return response.status(404).send();
        }
        if (Number(request.user.userId) === Number(user.id)) {
          await Promise.all(body.map(async (tag: any) => {
            const identifiedTag: any = (await getTagsByName(tag))[0];
            const checkUserTags: any = await getUserTag(query.userId, identifiedTag.id);
            if (checkUserTags[0]) {
              nonAddedTags.push(identifiedTag.name);
            } else {
              await addUserTags(query.userId, identifiedTag.id);
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

  server.patch('/users/:userId/tags', {
    onRequest: [server.authenticate],
    schema: patchUserTagsSchema,
    handler: async (request: any, response: any) => {
      try {
        const { params, body } = request;
        const userId = Number(params.userId);
        const user = await getUserById(userId);
        const setTags: any[] = [];
        if (!user) {
          return response.status(404).send();
        }
        if (userId !== request.user.userId) {
          return response.status(403).send({
            errorMsg: "Can't access a resource you don't own.",
          });
        }
        const userTagRelations = await getAllUserTags(userId);
        const userTagsId: any[] = [];
        userTagRelations.forEach((tag: any) => {
          userTagsId.push(tag.tagId);
        });
        const bodyTagsId: any[] = [];
        body.forEach((tag: any) => {
          bodyTagsId.push(tag.id);
        });
        const tagsToBeHere: any[] = [];
        const tagsNotToBeHere: any[] = [];
        userTagsId.forEach(async (tagId: any) => {
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
            await addUserTags(userId, remainingTagId);
          }
        }));
        await Promise.all(tagsNotToBeHere.map(async (extraTagId:any) => {
          const relation = (await getUserTag(userId, extraTagId))[0];
          await deleteUserTag(relation);
        }));
        return response.status(201).send(setTags);
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
            const userTagToDelete = (await getUserTag(query.userId, identifiedTag.id))[0];
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
