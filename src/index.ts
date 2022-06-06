import fastify from 'fastify';
import userRoutes from './routes/user/userRoute';

const server = fastify();
server.register(userRoutes);

export default server;

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
