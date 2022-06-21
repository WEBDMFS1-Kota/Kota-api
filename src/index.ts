import fastify from 'fastify';
import cors from '@fastify/cors';
import projectRoutes from './routes/project/projectRoute';
import tagRoutes from './routes/tag/tagRoute';
import userRoutes from './routes/user/userRoute';
import userTagsRoutes from './routes/userTags/userTagsRoutes';
import ProjectUserRoutes from './routes/projectUser/projectUserRoute';
import projectTagRoutes from './routes/projectTag/projectTagRoute';
import healthRoutes from './routes/health/healthRoutes';
import userVotesRoutes from './routes/userVotes/userVotesRoute';
import forgottenPasswordRoute from './routes/forgottenPassword/forgottenPasswordRoute';

const server = fastify({ logger: true });

server.register(require('@fastify/jwt'), {
  secret: 'supersecret',
});

server.register(require('@fastify/swagger'), {
  routePrefix: '/docs',
  openapi: {
    info: {
      title: 'Kota API Documentation',
      version: '1.0.0',
    },
    servers: [{
      url: `http://localhost:${process.env.PORT || 8080}`,
      description: 'Local API',
    },
    {
      url: 'https://kota-api-prod.herokuapp.com/',
      description: 'Production API',
    }],
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          name: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  hideUntagged: true,
  exposeRoute: true,
});

server.register(cors, {
  origin: '*',
});

server.decorate('authenticate', async (request: any, reply: any) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ errorMsg: err });
  }
});

server.register(projectRoutes);
server.register(projectTagRoutes);
server.register(userRoutes);
server.register(ProjectUserRoutes);
server.register(tagRoutes);
server.register(userTagsRoutes);
server.register(healthRoutes);
server.register(userVotesRoutes);
server.register(forgottenPasswordRoute);

const port = Number(process.env.PORT || 8080);
const host = process.env.HOST || '0.0.0.0';
server.listen({ port, host }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
