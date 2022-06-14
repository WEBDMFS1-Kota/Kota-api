import {
  getTagsByName,
} from '../../services/tag/tagService';

const tagRoutes = (server: any, opts: any, done: () => void) => {
  server.get('/tags', async (request: any) => {
    const { query } = request;
    try {
      const tags = await getTagsByName(query);
      return tags;
    } catch (error) {
      return error;
    }
  });

  done();
};

export default tagRoutes;
