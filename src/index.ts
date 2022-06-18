import fastify from 'fastify';
import cors from '@fastify/cors';
import projectRoutes from './routes/project/projectRoute';
import tagRoutes from './routes/tag/tagRoute';
import userRoutes from './routes/user/userRoute';
import userTagsRoutes from './routes/userTags/userTagsRoutes';
import ProjectUserRoutes from './routes/projectUser/projectUserRoute';

const server = fastify({ logger: true });

server.register(cors, {
  origin: '*',
});

server.register(projectRoutes);
server.register(userRoutes);
server.register(ProjectUserRoutes);
server.register(tagRoutes);
server.register(userTagsRoutes);

const port = Number(process.env.PORT || 8080);
const host = process.env.HOST || '0.0.0.0';
server.listen({ port, host }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
