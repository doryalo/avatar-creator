import fastify from 'fastify';
import { PORT, HOST } from './config';
import avatarRoutes from './routes/avatar';

const server = fastify();

// Register routes
server.register(avatarRoutes);

// Start the server
const start = async () => {
  try {
    await server.listen({ port: PORT, host: HOST });
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
