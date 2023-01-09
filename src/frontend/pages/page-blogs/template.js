import { html } from 'lit';
import '../../components/blog-component/index.js';

export function template () {
  return html`
    <style>
      .blog {
        display: flex;
        align-items: center;
        padding: 12px;
      }
      .blog * {
        flex: 1;
      }
    </style>
    <h2>
      Blogs
    </h2>
    ${this.errorMessage
      // if this is an errorMessage
      ? html`
        <div class="flex-group">
          ${this.errorMessage}
        </div>
      `
      : ''}
    <div class="blog-list">
      ${this.blogs.map(blog => html`
        <div blogs="blog">
          <a href="/blogs/${blog.id}">
            ${blog.title}
          </a>
          <p>
            ${blog.description} - Created at: ${new Date(blog.createdDate)}
          </p>

        </div>
      `)}
    </div>
    <blog-component @submit-blog="${this.createBlog}"></blog-component>
  `;
}
