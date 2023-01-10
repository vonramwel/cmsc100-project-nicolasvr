import { getDB } from '../../utils/db/index.js';

export const getBlog = async (request, reply) => {
  const { params, username } = request;
  const { blogId: id } = params;

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  const db = await getDB();

  const { blogs } = db;

  if (!blogs[id]) {
    return reply.notFound();
  }

  if (blogs[id].username !== username) {
    return reply.forbidden('You are not the owner of the blog');
  }

  const blogWithComments = Object
    .entries(blogs[id].comments)
    .map(function ([id, comment]) {
      return {
        id,
        ...comment
      };
    });

  blogs[id].comments = blogWithComments;
  return {
    id,
    ...blogs[id]
  };
};
