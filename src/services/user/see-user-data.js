import { getDB } from '../../utils/db/index.js';

export const seeUserData = async (request, reply) => {
  const { params, username } = request;
  const { userId } = params;

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  const db = await getDB();

  const { users } = db;


  return {
    username: userId,
    ...users[userId]
  };
};
