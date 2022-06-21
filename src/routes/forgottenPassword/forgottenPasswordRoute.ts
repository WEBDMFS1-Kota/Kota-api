import { sentEmailSchema } from '../../schema/sentSemailSchema';
import { sendEmail } from '../../services/forgottenPassword/forgottenPasswordService';
import { getUsers } from '../../services/user/userService';

const forgottenPasswordRoute = (server: any, opts: any, done: () => void) => {
  server.post('/resetPassword', {
    schema: sentEmailSchema,
    handler: async (request: any, response: any) => {
      try {
        const { query } = request;
        const userToSend = (await getUsers(query))[0];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const sendResetmail = await sendEmail(userToSend);
        return response.status(200).send();
      } catch (error) {
        return response.status(401).send({ errorMsg: 'Invalid email.' });
      }
    },
  });
  done();
};

export default forgottenPasswordRoute;
