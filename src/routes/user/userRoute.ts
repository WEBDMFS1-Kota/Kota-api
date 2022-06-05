/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
import {
  createUser, updateUser, getUser, deleteUser,
  // eslint-disable-next-line import/extensions
} from '../../services/user/userService';

const userRoutes = (server:any, opts: any, done :()=>void) => {
  server.delete('/users', async (request:any) => {
    const { query } = request;
    try {
      const user = await deleteUser(query);
      return `User ${user.pseudo} successfully deleted`;
    } catch (error) {
      return error;
    }
  });

  server.get('/users', async (request:any) => {
    const { query } = request;
    try {
      const user = await getUser(query);
      return user;
    } catch (error) {
      return error;
    }
  });

  server.patch('/users/:id', async (request:any) => {
    const { params } = request;
    const { query } = request;
    try {
      const updatedUser = await updateUser(params, query);
      return `User ${updatedUser.pseudo} successfully updated`;
    } catch (error) {
      return error;
    }
  });

  server.post('/users', async (request:any) => {
    const { query } = request;
    try {
      const newUser = await createUser(query);
      return `User ${newUser.pseudo} successfully created`;
    } catch (error) {
      return error;
    }
  });

  done();
};

export default userRoutes;
