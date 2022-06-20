import { sendEmail } from '../../services/forgottenPassword/forgottenPasswordService';
import { getUsers } from '../../services/user/userService';

const forgottenPasswordRoute = (server: any, opts: any, done: () => void) => {
  server.get('/resetPassword', async (request: any) => {
    try {
      const { query } = request;
      const userToSend = (await getUsers(query))[0];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const sendResetmail = await sendEmail(userToSend);
      return sendResetmail.response.status;
    } catch (error) {
      return error;
    }
  });
  done();
};

export default forgottenPasswordRoute;
