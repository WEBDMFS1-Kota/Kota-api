import {
    getTag,
    createTag
  } from '../../services/tag/tagService';
  
  const tagRoutes = (server:any, opts: any, done :()=>void) => {

    server.get('/tags', async (request:any) => {
      const { query } = request;
      try {
        const tags = await getTag(query);
        return tags;
      } catch (error) {
        return error;
      }
    });

    server.post('/tags', async (request:any) => {
      const { body } = request;
      try {
        const checkTag = (await getTag(body))[0];
        if (checkTag) {
          return `Tag with name "${checkTag.name}" already exists`;
        }
        
        const newTag = await createTag(body);
        return `Tag "${newTag.name}" successfully created`;
      } catch (error) {
        return error;
      }
    });

    
  done();
};

export default tagRoutes;
