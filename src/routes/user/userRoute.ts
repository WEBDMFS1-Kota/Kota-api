import {
  createUser, updateUser, deleteUser, getUser,
} from '../../services/user/userService';

const userRoutes = (server:any, opts: any, done :()=>void) => {
  server.delete('/users', async (request:any) => {
    const { query } = request;
    try {
      const user = await deleteUser(query);
      return `User "${user.pseudo}" successfully deleted`;
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

  server.patch('/users', async (request:any) => {
    const { query } = request;
    const { body } = request;
    try {
      if (body.pseudo || body.email) {              // On check si un utilisateur avec ce mail ou
        const checkUser = (await getUser(body))[0]; // ce pseudo existe déjà pour empêcher des duplicatas
        if (checkUser) {
          return `User with pseudo "${checkUser.pseudo}" and mail "${checkUser.email}" already exists`;
        }
      }
      const checkedUser = (await getUser(query))[0]; // on recherche l'id de l'utilisateur à modifier pour le passer en paramètre de la
      if (checkedUser === undefined) {               //  fonction du service
        return `The user "${query.pseudo}" that you try to update doesn't exist`;
      }
      const updatedUser = await updateUser(checkedUser.id, body);
      return `User "${updatedUser.pseudo}" successfully updated`;
    } catch (error) {
      return error;
    }
  });

  server.post('/users', async (request:any) => {
    const { body } = request;
    try {
      const checkUserPseudo = (await getUser(body))[0]; // On check si un utilisateur avec ce mail
      if (checkUserPseudo) {                            // ou ce pseudo existe déjà pour empêcher des duplicatas
        return `User with pseudo "${checkUserPseudo.pseudo}" already exists`;
      }
      const checkUserEmail = (await getUser(body))[0];
      if (checkUserEmail) {
        return `User with email "${checkUserEmail.email}" already exists`;
      }
      const newUser = await createUser(body);
      return `User "${newUser.pseudo}" successfully created`;
    } catch (error) {
      return error;
    }
  });

  done();
};

export default userRoutes;
