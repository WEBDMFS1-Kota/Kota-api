import { resetPassword } from '../../services/forgottenPassword/forgottenPasswordService';

const forgottenPasswordRoute = (server: any, opts: any, done: () => void) => {
  server.get('/resetPassword', async (request: any) => {
    try {
      const { query } = request;
      console.log(query);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const sendResetmail = await resetPassword();
      return sendResetmail;
    } catch (error) {
      return error;
    }
  });
  done();
};

export default forgottenPasswordRoute;
