import {
  getTagsByName,
} from '../../services/tag/tagService';
import { getTagsSchema } from '../../schema/tagsSchema';

const tagRoutes = (server: any, opts: any, done: () => void) => {
  server.get('/tags', {
    schema: getTagsSchema,
    handler: async (request: any, response: any) => {
      const { query } = request;
      try {
        const tags = await getTagsByName(query);
        if(tags){
          return response.status(200).send(tags);
        }
        return response.status(404).send();
      } catch (error) {
        return error;
      }
    },
  });

  done();
};

export default tagRoutes;
