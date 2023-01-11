// import { customElement, property } from 'lit/decorators.js';
// import { LitNoShadow } from '../../utils/lit-no-shadow/index.js';
// import { template } from './template.js';

// /**
//  * @type {LitPage}
//  */
// @customElement('user-component')
// class Page extends LitNoShadow {
//   @property({ type: Object })
//   user = null

//   render () {
//     return template.bind(this)();
//   }

//   async submitUser (event) {
//     event.preventDefault();

//     const { target: form } = event;

//     const detail = {

//       firstName: form.firstName.value,
//       lastName: form.lastName.value,
//     };

//     // we want to dispatch this event
//     this.dispatchEvent(new window.CustomEvent('submit-user', { detail }));
//   }
// }

// export { Page };
