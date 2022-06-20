import { sendEmail } from '../../services/forgottenPassword/forgottenPasswordService';

const forgottenPasswordRoute = (server: any, opts: any, done: () => void) => {
  server.get('/resetPassword', async (request: any) => {
    try {
      const { query } = request;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const options = { emailID: 'test' };
      const sendResetmail = await sendEmail(query, options);
      return sendResetmail;
    } catch (error) {
      return error;
    }
  });
  done();
};

export default forgottenPasswordRoute;
