import { html } from 'lit';
import '../../components/blog-component/index.js';
import '../../components/comment-component/index.js';
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
    
    ${this.errorMessage
      // if this is an errorMessage
      ? html`
        <div class="flex-group">
          ${this.errorMessage}
        </div>
      `
      : ''}
      ${Object.keys(this.blog).length
? html`
  
  <h3>
  Title: <u> ${this.blog.title} </u>
  </h3> 

  <h5>
  Description: ${this.blog.description}
  <br>
  Posted by: ${this.blog.username}
  
  <br> 
  
  Posted on: ${new Date(this.blog.createdDate)}
  

  <br>
  Last edited on: ${new Date(this.blog.editedDate)}
  </h5> 

  <button @click="${this.editBlog}"> Edit </button> 
  <button @click= "${this.deleteBlog}"> Delete </button> 

  ${this.edit
    ? html`
    <blog-component @submit-blog="${this.updateBlog}" .blog="${this.blog}"></blog-component>
             
    `
    : ''
  }

   <h4> <u> Comments </u> </h4>

  ${this.blog
    ? this.comments.map(comment => {
          return html` 
            <h4> 
            ${comment.data}
            </h4>
            <h6>
             Commented by: ${comment.username}
            <br>
            Date Commented: ${new Date(comment.createdDate)}
            <br>
             Last Comment Edit: ${new Date(comment.editedDate)}
             </h6>           
            `;
          })
    : ''}
        `
    : ''}
      `;
}
