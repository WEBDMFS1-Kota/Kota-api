import fastify from 'fastify';
import projetRoutes from './routes/projet/projetRoute';

const dotenv = require('dotenv');
dotenv.config();

const server = fastify({ logger: true });
server.register(projetRoutes);

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

server.get('/ping', async (request: any, reply: any) => {
  console.log(request);
  console.log(reply);
  return 'pong!!\n';
});

server.listen(port, host, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
