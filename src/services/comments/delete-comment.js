import { getDB, saveDB } from '../../utils/db/index.js';

export const deleteComment = async (request, reply) => {
  const { params, username } = request;
  const { blogId: id, commentId: commentID } = params;
  const db = await getDB();

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  if (db.blogs[id].comments[commentID].username !== username) {
    return reply.forbidden('You are not the owner of the comment');
  }

  delete db.blogs[id].comments[commentID];

  await saveDB(db);

  return {
    success: true
  };
};
