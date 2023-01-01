import { getDB, saveDB } from '../../utils/db/index.js';
import { v4 } from 'uuid';

export const createBlog = async (request, reply) => {
  const { body } = request;
  const { title, description } = body;
  const db = await getDB();

  const id = v4();

  const blog = {
    title,
    description,
    createdDate: new Date().getTime(),
    editedDate: new Date().getTime(),
    comments: {}
  };

  db.blogs[id] = blog;

  await saveDB(db);

  /**
       * const newObj = {
       *   id
       * }
       *
       * for (const key in todo) {
       *   newObj[key] = todo[key]
       * }
       *
       * return newObj
       */
  return {
    id,
    ...blog
  };
};