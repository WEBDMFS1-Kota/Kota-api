import { getTagsByName } from '../../services/tag/tagService';
import {
  addUserTags, getUserTag, getAllUserTags,
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
      const tagToAdd:any = (await getTagsByName(body))[0];
      const checkUserTags:any = await getUserTag(query, tagToAdd);
      if (checkUserTags[0]) {
        return `User already has the "${tagToAdd.name}" tag.`;
      }
      const updatedUserTags = await addUserTags(query, tagToAdd);
      return `Added tag(s) "${tagToAdd.name}" to ${updatedUserTags.pseudo}'s tags.`;
    } catch (error) {
      return error;
    }
  });

  done();
};

export default userTagsRoutes;
