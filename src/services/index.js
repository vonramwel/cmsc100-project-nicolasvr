import { general } from './general/index.js';
import { createBlog } from './blogs/create-blog.js';
import { deleteBlog } from './blogs/delete-blog.js';
import { getManyBlog } from './blogs/get-many-blogs.js';
import { getBlog } from './blogs/get-blog.js';
import { updateBlog } from './blogs/update-blog.js';
import { addComment } from './comments/add-comment.js';
import { registerUser } from './user/register-user.js';
import { login } from './user/login.js';
import { logout } from './user/logout.js';
import { authCheck } from './user/auth-check.js';

export class Service {
  constructor (app) {
    this.app = app;
  }

  general = general
  createBlog = createBlog
  deleteBlog = deleteBlog
  getManyBlog = getManyBlog
  getBlog = getBlog
  updateBlog = updateBlog

  // comment functions
  addComment = addComment

   // user functions
   registerUser = registerUser
   login = login
   logout = logout
   authCheck = authCheck
}
