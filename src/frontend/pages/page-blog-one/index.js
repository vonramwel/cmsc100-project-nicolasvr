import { customElement, property } from 'lit/decorators.js';
import { state } from '../../worker/index.js';
import { changeUrl } from '../../utils/helpers/change-url.js';
import { LitPage } from '../../utils/lit-page/index.js';
import { template } from './template.js';

/**
 * @type {LitPage}
 */
@customElement('page-blog-one')
class Page extends LitPage {
  @property({ type: Object })
  blog = {}

  @property({ type: String })
  errorMessage = ''

  @property({ type: Boolean })
  edit = false;

  render () {
    return template.bind(this)();
  }

  async updated (changedMap) {
    await super.updated(changedMap);
    if (changedMap.has('paramObject')) {
      const { id } = this.paramObject || {};
      if (id) {
        await this.getBlog(id);
      }
    }
  }

  async getBlog (id) {
    const response = await window.fetch(`/api/blog/${id}`);
    if (response.status !== 200) {
      return this.setErrorMessage(await response.json(), response.status);
    }
    try {
      if (response.status !== 200) {
        return this.setErrorMessage(await response.json(), response.status);
      } else {
        this.blog = await response.json();
        this.comments = this.blog.comments;
      }
    } catch (error) {
      return this.setErrorMessage(error, 404);
    }
  }

  async editBlog (event) {
    event.preventDefault();
    this.edit = true;
  }

  async deleteBlog (event) {
    event.preventDefault();
    // we get the data from the detail being sent by the todo-component
    const { detail } = event;
    const response = await window.fetch(`/api/blog/${this.blog.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(detail)
    });
    try {
      if (response.status !== 200) {
        return this.setErrorMessage(await response.json(), response.status);
      } else {
        this.blog = await response.json();
        changeUrl('/blogs');
      }
    } catch (error) {
      return this.setErrorMessage(error, 404);
    }
  }

  async updateBlog (event) {
    event.preventDefault();
    // we get the data from the detail being sent by the todo-component
    const { detail } = event;
    const response = await window.fetch(`/api/blog/${this.blog.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(detail)
    });
    try {
      if (response.status !== 200) {
      //  this.willEdit = false;
        return this.setErrorMessage(await response.json(), response.status);
      } else {
        this.blog = await response.json();
        // changeUrl('/blogs');
      }
    } catch (error) {
      return this.setErrorMessage(error, 404);
    }
  }

  // async addComment (event) {
  //   event.preventDefault();
  //   // we get the data from the detail being sent by the todo-component
  //   const { detail } = event;
  //   const response = await window.fetch('/api/blog${detail.id}/comment', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({data: detail.data})
  //   });
  //   try {
  //     const comment = await response.json();
  //     // appends the new object
  //     this.blogs = [
  //       comment,
  //       ...this.comments
  //     ];
  //   } catch (error) {
  //     return this.setErrorMessage(error, 404);
  //   }
  // }

  async setErrorMessage (data, status) {
    const { message, error } = data;
    this.errorMessage = `HTTP Code: ${status} - ${error} - ${message}`;
    await state.set('user-is-logged-in', false);
  }
}

export { Page };
