import { getTagsByName } from '../../services/tag/tagService';
import { getUser } from '../../services/user/userService';
import {
  addUserTags, getUserTag, getAllUserTags, deleteUserTag,
} from '../../services/userTags/usertagsService';

const userTagsRoutes = (server: any, opts: any, done: () => void) => {
  server.get('/users/tags', async (request: any) => {
    const { query } = request;
    try {
      const user = await getAllUserTags(query);
      return user;
    } catch (error) {
      return error;
    }
  });

  server.post('/users/tags', async (request: any) => {
    const { query, body } = request;
    try {
      const identifiedTag:any = (await getTagsByName(body))[0];
      const checkUserTags:any = await getUserTag(query, identifiedTag);
      if (checkUserTags[0]) {
        return `User already has the "${identifiedTag.name}" tag.`;
      }
      const updatedUserTags = await addUserTags(query, identifiedTag);
      return `Added tag(s) "${identifiedTag.name}" to ${updatedUserTags.pseudo}'s tags.`;
    } catch (error) {
      return error;
    }
  });

  server.delete('/users/tags', async (request: any) => {
    const { query } = request;
    try {
      const userToModify = (await getUser(query))[0];
      const identifiedTag = (await getTagsByName(query))[0];
      const userTagToDelete = (await getUserTag(userToModify, identifiedTag))[0];
      // A voir quoi faire du retour d'une relation supprimée
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const updatedUserTags = await deleteUserTag(userTagToDelete);
      return `Tag "${query.name}" deleted from ${userToModify.pseudo}'s tags.`;
    } catch (error) {
      return error;
    }
  });

  done();
};

export default userTagsRoutes;
