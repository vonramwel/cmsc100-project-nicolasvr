import { getDB, saveDB } from '../../utils/db/index.js';

export const changeUserData = async (request, reply) => {
  const { params, body, username } = request;
  const { userId: id } = params;
  const { firstName, lastName } = body;

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  const db = await getDB();

  if (id !== username) {
    return reply.forbidden('You are not allowed to change other user data');
  }

  db.users[id].firstName = firstName || db.users[id].firstName;
  db.users[id].lastName = lastName || db.users[id].lastName;
  db.users[id].editedDate = new Date().getTime();

  await saveDB(db);

  return {
    username: id,
    ...db.users[id]
  };
};
