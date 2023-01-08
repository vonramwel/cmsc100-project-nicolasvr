import { getDB, saveDB } from '../../utils/db/index.js';
import { v4 } from 'uuid';

export const addComment = async (request, reply) => {
  const { params, body, username } = request;
  const { data } = body;
  const { blogId } = params;
  const db = await getDB();

  const id = v4();

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  const comment = {
    data,
    username,
    createdDate: new Date().getTime(),
    editedDate: new Date().getTime()
  };

  db.blogs[blogId].comments[id] = comment;

  await saveDB(db);

  return {
    id,
    ...comment
  };
};
