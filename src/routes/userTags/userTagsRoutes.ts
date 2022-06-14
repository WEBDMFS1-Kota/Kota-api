import { getTagsByName, getTagsById } from '../../services/tag/tagService';
import {
  addUserTags, getUserTag, getAllUserTags, deleteUserTag,
} from '../../services/userTags/usertagsService';

const userTagsRoutes = (server: any, opts: any, done: () => void) => {
  server.get('/users/tags', async (request: any) => {
    const { query } = request;
    try {
      const userTagsRelations = await getAllUserTags(query);
      const userTags: any[] = [];
      await Promise.all(userTagsRelations.map(async (userTagRelation) => {
        const tagId = await getTagsById(userTagRelation);
        userTags.push(tagId);
      }));
      return userTags;
    } catch (error) {
      return error;
    }
  });

  server.post('/users/tags', async (request: any) => {
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
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const updatedUserTags = await addUserTags(query, identifiedTag);
          addedTags.push(identifiedTag.name);
        }));
      } else {
        const identifiedTag: any = (await getTagsByName(body))[0];
        const checkUserTags: any = await getUserTag(query, identifiedTag);
        if (checkUserTags[0]) {
          return `User already has the "${identifiedTag.name}" tag.`;
        }
        const updatedUserTags = await addUserTags(query, identifiedTag);
        return `Added tag(s) "${identifiedTag.name}" to ${updatedUserTags.pseudo}'s tags.`;
      }
      return `Added tag(s) "${addedTags}" to user, already had "${nonAddedTags}".`;
    } catch (error) {
      return error;
    }
  });

  server.delete('/users/tags', async (request: any) => {
    const { query } = request;
    try {
      const identifiedTag = (await getTagsByName(query))[0];
      const userTagToDelete = (await getUserTag(query, identifiedTag))[0];
      // A voir quoi faire du retour d'une relation supprimée
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const updatedUserTags = await deleteUserTag(userTagToDelete);
      return `Tag "${identifiedTag.name}" deleted from user's tags.`;
    } catch (error) {
      return error;
    }
  });

  done();
};

export default userTagsRoutes;
