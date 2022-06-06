import fastify from 'fastify';
import projetRoutes from './routes/projet/projetRoute';

const server = fastify({ logger: true });
server.register(projetRoutes);

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
