import { Md5 } from 'ts-md5/dist/md5';
import { forgotPasswordSchema, resetPasswordSchema } from '../../schema/sentSemailSchema';
import { sendEmail } from '../../services/mailjetService';
import { getUsers, updateUser } from '../../services/user/userService';

const forgottenPasswordRoutes = (server: any, opts: any, done: () => void) => {
  server.post('/resetPassword', {
    schema: resetPasswordSchema,
    handler: async (request: any, response: any) => {
      try {
        const { token, password } = request.body;

        if (!server.jwt.verify(token)) {
          return response.status(403).send();
        }

        const { userId, type, resetToken } = server.jwt.decode(token);

        const user = (await getUsers({ userId }))[0];

        if (!user || Md5.hashStr(user.email || '') !== resetToken || (!type || type !== 'reset_password')) {
          return response.status(401).send();
        }

        const updatedUser = await updateUser(user.id, { password });

        const { pseudo, avatar } = updatedUser;
        const logToken = server.jwt.sign({ userId: updatedUser.id, pseudo, avatar });

        const variables = {
          pseudo,
          avatar,
        };

        const emailConfig = {
          subject: 'Kota - Your password has been reset',
          emailID: process.env.MAILJET_PASSWORD_RESET_TEMPLATEID || '',
        };

        await sendEmail(user, variables, emailConfig);
        return response.status(200).send(logToken);
      } catch (error) {
        return response.status(503).send();
      }
    },
  });
  server.post('/forgotPassword', {
    schema: forgotPasswordSchema,
    handler: async (request: any, response: any) => {
      try {
        const { body } = request;
        const userToSend = (await getUsers(body))[0];

        const signOptions = {
          expiresIn: '1h',
        };

        const token = server.jwt.sign({ userId: userToSend.id, type: 'reset_password', resetToken: Md5.hashStr(userToSend.email || '') }, signOptions);

        const variables = {
          pseudo: userToSend.pseudo,
          token,
        };

        const emailConfig = {
          subject: 'Kota - reset your password',
          emailID: process.env.MAILJET_RESET_TEMPLATEID || '',
        };

        await sendEmail(userToSend, variables, emailConfig);
        return response.status(200).send();
      } catch (error) {
        return response.status(401).send({ errorMsg: 'Invalid email.' });
      }
    },
  });
  done();
};

export default forgottenPasswordRoutes;
