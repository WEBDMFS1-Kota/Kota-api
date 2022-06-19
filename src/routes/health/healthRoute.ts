import { health } from '../../services/health/healthService';

const healthRoute = (server: any, opts: any, done: () => void) => {
  server.get('/health', async () => {
    try {
      const healthStatus = await health();
      return `Returned the number of available tags as a database health status report : ${healthStatus}.`;
    } catch (error) {
      return error;
    }
  });
  done();
};

export default healthRoute;
