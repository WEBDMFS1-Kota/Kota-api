import fastify from 'fastify';
<<<<<<< HEAD
import projectRoutes from './routes/project/projectRoute';

const server = fastify({ logger: true });
server.register(projectRoutes);
=======

// Routes
import projetRoutes from './routes/projet/projetRoute';
import userRoutes from './routes/user/userRoute';

const dotenv = require('dotenv');

dotenv.config();

const server = fastify({ logger: true });

// Registering routes in fastify
server.register(projetRoutes);
server.register(userRoutes);
>>>>>>> 30ec90ea4ea0e0ceaf5550fd336bb1f101bcc6a4

// Configuring and starting the server
const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

server.listen(port, host, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
