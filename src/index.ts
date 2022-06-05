import fastify from 'fastify';

const dotenv = require('dotenv');

dotenv.config();

const server = fastify();
const port = process.env.PORT || 8080;

server.get('/ping', async (request, reply) => {
  console.log(request);
  console.log(reply);
  return 'pong!!\n';
});

server.listen(port, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
