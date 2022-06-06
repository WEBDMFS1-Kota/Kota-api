import fastify from 'fastify';
import userRoutes from './routes/user/userRoute';

const dotenv = require('dotenv');

dotenv.config();

const server = fastify();

server.register(userRoutes);

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

server.listen(port, host, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
