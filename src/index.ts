/* eslint-disable import/extensions */
import fastify from 'fastify';
// eslint-disable-next-line import/no-unresolved
import userRoutes from './routes/user/userRoute';

const server = fastify();
server.register(userRoutes);

export default server;

server.get('/ping', async (request:any, reply:any) => {
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
