import { FastifyRequest } from 'fastify';

// Request query parameters
export interface AvatarQueryParams {
  name?: string;
  backgroundColor?: string;
}

// Request object with typed query parameters
export interface AvatarRequest extends FastifyRequest {
  query: AvatarQueryParams;
} 