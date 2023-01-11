// import { html } from 'lit';
// import '../../components/header-component/index.js';

// export function template () {
//   return html`
//     <style>
//       .user {
//         display: flex;
//         align-items: center;
//         padding: 12px;
//       }
//       .user * {
//         flex: 1;
//       }
//     </style>
//     <h2>
//       Users
//     </h2>
//     ${this.errorMessage
//       // if this is an errorMessage
//       ? html`
//         <div class="flex-group">
//           ${this.errorMessage}
//         </div>
//       `
//       : ''}
//     <div class="user-list">
//       ${this.users.map(user => html`
//         <div users="user">
//           <a href="/user/${user.username}">
//             ${user.username}
//           </a>
//           <p>
//             ${user.firstName} - Created at: ${new Date(user.createdDate)}
//           </p>

//         </div>
//       `)}
//     </div>
//     <user-component @submit-user="${this.getUser}"></user-component>
//   `;
// }
