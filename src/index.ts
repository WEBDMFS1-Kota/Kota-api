import fastify from 'fastify';
import projectRoutes from './routes/project/projectRoute';

const server = fastify({ logger: true });

server.register(projectRoutes);

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

server.listen(port, host, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
