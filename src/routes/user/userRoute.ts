import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import {
  createUser, updateUser, deleteUser, getUsers, getUserByEmailAndPassword, getUserById,
} from '../../services/user/userService';
import {
  deleteUserSchema,
  getUserSchema,
  patchUserSchema,
  postUserSchema,
  signInSchema,
  signUpSchema,
} from '../../schema/userSchema';

const userRoutes = (server: any, opts: any, done: () => void) => {
  server.post('/signin', {
    schema: signInSchema,
    handler: async (request: any, response: any) => {
      const { email, password, rememberMe } = request.body;
      let signOptions = {};
      if (!rememberMe) {
        signOptions = {
          ...signOptions,
          expiresIn: '7d',
        };
      }
      const user = await getUserByEmailAndPassword(email, password);
      if (user) {
        const { pseudo, avatar } = user;
        const token = server.jwt.sign({ userId: user.id, pseudo, avatar }, signOptions);
        return response.status(200).send({ token });
      }
      return response.status(401).send({ errorMsg: 'Invalid credentials.' });
    },
  });

  server.post('/signup', {
    schema: signUpSchema,
    handler: async (request: any, response: any) => {
      const { body } = request;
      try {
        const newUser = await createUser(body);
        if (newUser) {
          const { pseudo, avatar } = newUser;
          const token = server.jwt.sign({ userId: newUser.id, pseudo, avatar });
          return response.status(201).send({ token });
        }
        return response.status(503).send({ errorMsg: 'User creation errored: newUser is undefined' });
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
          return response.status(409).send({ errorMsg: 'Either your pseudo or the email is already taken.' });
        }
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  server.delete('/users', {
    onRequest: [server.authenticate],
    schema: deleteUserSchema,
    handler: async (request: any, response: any) => {
      const { query } = request;
      try {
        const { id } = query.id;
        const user = await getUserById(id);
        if (user) {
          await deleteUser(query);
          return response.status(204).send();
        }
        return response.status(404).send();
      } catch (error) {
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  server.get('/users', {
    schema: getUserSchema,
    handler: async (request: any, response: any) => {
      const { query } = request;
      try {
        const user = await getUsers(query);
        if (user) {
          return response.status(200).send(user);
        }
        return response.status(404).send();
      } catch (error) {
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  server.patch('/users', {
    onRequest: [server.authenticate],
    schema: patchUserSchema,
    handler: async (request: any, response: any) => {
      const { body } = request;
      try {
        const user = await getUserById(request.user.userId);
        if (user) {
          const updatedUser = await updateUser(user.id, body);
          return response.status(200).send(updatedUser);
        }
        return response.status(404).send();
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
          return response.status(409).send({ errorMsg: 'Either your pseudo or the email is already taken.' });
        }
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  server.post('/users', {
    schema: postUserSchema,
    handler: async (request: any, response: any) => {
      const { body } = request;
      try {
        const newUser = await createUser(body);
        if (newUser) {
          const token = server.jwt.sign({ userId: newUser.id });
          return response.status(201).send({ token });
        }
        return response.status(503).send({ errorMsg: 'User creation errored: newUser is undefined' });
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
          return response.status(409).send({ errorMsg: 'Either your pseudo or the email is already taken.' });
        }
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  done();
};

export default userRoutes;
