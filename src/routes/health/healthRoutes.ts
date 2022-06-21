import { health } from '../../services/health/healthService';

const healthRoutes = (server: any, opts: any, done: () => void) => {
  server.get('/healthApi', async () => null);

  server.get('/healthDb', async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const healthStatus = await health();
      return null;
    } catch (error) {
      return {
        response: {
          500: {
            description: 'Database error',
          },
        },
      };
    }
  });

  done();
};

export default healthRoutes;
