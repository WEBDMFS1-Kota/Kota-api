import fastify from 'fastify';

const dotenv = require('dotenv');

dotenv.config();

const server = fastify();
const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

server.get('/ping', async (request, reply) => {
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
