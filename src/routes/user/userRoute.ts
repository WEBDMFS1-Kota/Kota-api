import {
  createUser, updateUser, deleteUser, getUser,
} from '../../services/user/userService';
import {
  deleteUserSchema,
  getUserSchema,
  patchUserSchema,
  postUserSchema,
} from '../../schema/userSchema';

const userRoutes = (server: any, opts: any, done: () => void) => {
  server.delete('/users', {
    schema: deleteUserSchema,
    handler: async (request: any) => {
      const { query } = request;
      try {
        const user = await deleteUser(query);
        return `User "${user.pseudo}" successfully deleted`;
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
        const user = await getUser(query);
        return user;
      } catch (error) {
        return error;
      }
    },
  });

  server.patch('/users', {
    schema: patchUserSchema,
    handler: async (request: any) => {
      const { query, body } = request;
      try {
      // Checking if user pseudo/mail already exists to avoid duplication
        if (body.pseudo || body.email) {
          const checkUser = (await getUser(body))[0];
          if (checkUser) {
            return `User with pseudo "${checkUser.pseudo}" and mail "${checkUser.email}" already exists`;
          }
        }
        // Fetching userId to update the right one
        const checkedUser = (await getUser(query))[0];
        if (checkedUser === undefined) {
          return `The user "${query.pseudo}" that you try to update doesn't exist`;
        }
        const updatedUser = await updateUser(checkedUser.id, body);
        return updatedUser;
      } catch (error) {
        return error;
      }
  });

  server.post('/users', {
    schema: postUserSchema,
    handler: async (request: any) => {
      const { body } = request;
      try {
        const checkUserPseudo = (await getUser(body))[0]; // On check si un utilisateur avec ce mail
        if (checkUserPseudo) { // ou ce pseudo existe déjà pour empêcher des duplicatas
          return `User with pseudo "${checkUserPseudo.pseudo}" already exists`;
        }
        const checkUserEmail = (await getUser(body))[0];
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
