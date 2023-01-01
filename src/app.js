import Fastify from 'fastify';
import { general } from './services/general/index.js';
import { createBlog } from './services/blogs/create-blog.js';
import { getManyBlog } from './services/blogs/get-many-blogs.js';
// import { getTodo } from './services/todos/get-todo.js';

const prefix = '/api';

export async function build () {
  // initialize fastify
  const fastify = Fastify({ logger: true });

  fastify.get(prefix, general);

  // create todo
  fastify.post(`${prefix}/blog`, createBlog);

  // get many todo
  fastify.get(`${prefix}/blog`, getManyBlog);

  // get one todo
  // fastify.get(`${prefix}/todo/:todoId`, getTodo);

  return fastify;
}
