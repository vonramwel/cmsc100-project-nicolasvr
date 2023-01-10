import { getDB, saveDB } from '../../utils/db/index.js';
import { hash } from 'bcrypt';
const saltRounds = 10;

export const changePassword = async (request, reply) => {
  const { body, username } = request;
  const { password } = body;

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  const db = await getDB();

  const newHashedPassword = await hash(password, saltRounds);

  db.users[username].hashedPassword = newHashedPassword;
  db.users[username].updatedDate = new Date().getTime();
  await saveDB(db);

  return {
    success: true
  };
};
