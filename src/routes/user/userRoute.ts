import {
  createUser, updateUser, deleteUser, getUsers, getUserByEmailAndPassword,
} from '../../services/user/userService';
import {
  deleteUserSchema,
  getUserSchema,
  patchUserSchema,
  postUserSchema,
  signInSchema,
} from '../../schema/userSchema';

const userRoutes = (server: any, opts: any, done: () => void) => {
  server.post('/signin', {
    schema: signInSchema,
    handler: async (request: any, response: any) => {
      const { email, password } = request.body;
      const user = await getUserByEmailAndPassword(email, password);
      if (user) {
        const token = server.jwt.sign({ userId: user.id });
        return response.status(200).send({ token });
      }
      return response.status(401).send({ errorMsg: 'Invalid credentials.' });
    },
  });

  server.post('/signup', {
    schema: postUserSchema,
    handler: async (request: any, response: any) => {
      const { body } = request;
      try {
        const newUser = await createUser(body);
        if (newUser) {
          const token = server.jwt.sign({ userId: newUser.id });
          return response.status(201).send({ token });
        }
        return response.status(503).send({ errorMsg: 'Internal Server Error' });
      } catch (error) {
        return response.status(503).send({ errorMsg: error });
      }
    },
  });

  server.delete('/users', {
    onRequest: [server.authenticate],
    schema: deleteUserSchema,
    handler: async (request: any) => {
      const { query } = request;
      try {
        const user = await deleteUser(query);
        return user;
      } catch (error) {
        return error;
      }
    },
  });

  server.get('/users', {
    schema: getUserSchema,
    handler: async (request: any) => {
      const { query } = request;
      try {
        const user = await getUsers(query);
        return user;
      } catch (error) {
        return error;
      }
    },
  });

  server.patch('/users', {
    onRequest: [server.authenticate],
    schema: patchUserSchema,
    handler: async (request: any) => {
      const { query, body } = request;
      try {
        // Checking if user pseudo/mail already exists to avoid duplication
        if (body.pseudo || body.email) {
          const checkUser = (await getUsers(body))[0];
          if (checkUser) {
            return `User with pseudo "${checkUser.pseudo}" and mail "${checkUser.email}" already exists`;
          }
        }
        // Fetching userId to update the right one
        const checkedUser = (await getUsers(query))[0];
        if (checkedUser === undefined) {
          return `The user "${query.pseudo}" that you try to update doesn't exist`;
        }
        const updatedUser = await updateUser(checkedUser.id, body);
        return updatedUser;
      } catch (error) {
        return error;
      }
    },
  });

  server.post('/users', {
    onRequest: [server.authenticate],
    schema: postUserSchema,
    handler: async (request: any) => {
      const { body } = request;
      try {
        const checkUserPseudo = (await getUsers(body))[0];
        if (checkUserPseudo) {
          return `User with pseudo "${checkUserPseudo.pseudo}" already exists`;
        }
        const checkUserEmail = (await getUsers(body))[0];
        if (checkUserEmail) {
          return `User with email "${checkUserEmail.email}" already exists`;
        }
        const newUser = await createUser(body);
        return newUser;
      } catch (error) {
        return error;
      }
    },
  });

  done();
};

export default userRoutes;
