import { getDB, saveDB } from '../../utils/db/index.js';

export const updateComment = async (request, reply) => {
  const { params, body, username } = request;
  const { blogId: id, commentId: commentID } = params;
  const { data } = body;

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  const db = await getDB();

  if (db.blogs[id].comments[commentID].username !== username) {
    return reply.forbidden('You are not the owner of the comment');
  }

  db.blogs[id].comments[commentID].data = data || db.blogs[id].comments[commentID].data;
  db.blogs[id].comments[commentID].editedDate = new Date().getTime();

  await saveDB(db);

  return {
    id: commentID,
    ...db.blogs[id].comments[commentID]
  };
};
