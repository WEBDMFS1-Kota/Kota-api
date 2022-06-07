import fastify from 'fastify';
import projectRoutes from './routes/project/projectRoute';

const server = fastify({ logger: true });
server.register(projectRoutes);

server.get('/ping', async (request: any, reply: any) => {
  console.log(request);
  console.log(reply);
  return 'pong!!\n';
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
