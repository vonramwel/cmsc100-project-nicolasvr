import { general } from './general/index.js';
import { blog } from './blog/index.js';
import { user } from './user/index.js';
import { comments } from './comments/index.js';

export const paths = {
  ...general,
  ...blog,
  ...user,
  ...comments
};
