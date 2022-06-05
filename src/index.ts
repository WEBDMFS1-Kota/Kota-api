import fastify from 'fastify';
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
import {
  createUser, updateUser, getUser, deleteUser,
  // eslint-disable-next-line import/extensions
} from './services/user/userService';
// eslint-disable-next-line import/extensions

// Modif Alice
import projetRoutes from './routes/projet/projetRoute';

const server = fastify({ logger: true });
server.register(projetRoutes);
// fin modif

server.get('/ping', async (request: any, reply: any) => {
  console.log(request);
  console.log(reply);
  return 'pong!!\n';
});

server.delete('/users/deleteUser', async (request: any) => {
  const { query } = request;
  const user = await deleteUser(query);
  return user;
});

server.get('/users/getUser', async (request: any) => {
  console.log(request);
  const { query } = request;
  const user = await getUser(query);
  return user;
});

server.patch('/users/updateUser/:id', async (request: any) => {
  const { params } = request;
  const { query } = request;
  const updatedUser = await updateUser(params, query);
  return updatedUser;
});

server.post('/users/newUser', async (request: any) => {
  const { query } = request;
  const newUser = await createUser(query);
  return newUser;
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
