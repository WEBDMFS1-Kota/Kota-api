import fastify from 'fastify';
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
import {
  createUser, updateUser, getUser, deleteUser,
// eslint-disable-next-line import/extensions
} from './services/user/userService';
// eslint-disable-next-line import/extensions

const server = fastify();

server.get('/ping', async (request:any, reply:any) => {
  console.log(request);
  console.log(reply);
  return 'pong!!\n';
});

server.delete('/users', async (request:any) => {
  const { query } = request;
  try {
    await deleteUser(query);
    return 'User successfully deleted';
  } catch (error) {
    return error;
  }
});

server.get('/users', async (request:any) => {
  const { query } = request;
  const user = await getUser(query);
  return user;
});

server.patch('/users/:id', async (request:any) => {
  const { params } = request;
  const { query } = request;
  const updatedUser = await updateUser(params, query);
  return updatedUser;
});

server.post('/users', async (request:any) => {
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
