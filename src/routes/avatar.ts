import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { DEFAULT_BACKGROUND_COLOR } from '../config';
import { AvatarQueryParams } from '../types';
import { generateAvatar } from '../utils/avatar';

/**
 * Register avatar routes
 */
export default function avatarRoutes(server: FastifyInstance, opts: object, done: () => void) {
  // Route to generate user avatar
  server.get("/user-avatar", async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, backgroundColor = DEFAULT_BACKGROUND_COLOR } = request.query as AvatarQueryParams;
    console.log(name, backgroundColor);
    // Validate that name is provided
    if (!name) {
      reply.code(400).send({ error: 'Name parameter is required' });
      return;
    }

    try {
      // Generate avatar
      const avatarDataUrl = generateAvatar(name, backgroundColor);

      // Set response headers
      reply.header('Content-Type', 'image/png');
      
      // Convert data URL to buffer and send
      const base64Data = avatarDataUrl.split(',')[1];
      const imageBuffer = Buffer.from(base64Data, 'base64');
      
      return imageBuffer;
    } catch (error) {
      console.error('Error generating avatar:', error);
      reply.code(500).send({ error: 'Failed to generate avatar' });
    }
  });

  done();
} 