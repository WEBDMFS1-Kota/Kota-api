import { health } from '../../services/health/healthService';

const healthRoute = (server: any, opts: any, done: () => void) => {
  server.get('/health', async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const healthStatus = await health();
      return {
        response: {
          200: {
            description: 'OK',
          },
        },
      };
    } catch (error) {
      return {
        response: {
          500: {
            description: 'Database error',
            message: error,
          },
        },
      };
    }
  });
  done();
};

export default healthRoute;
