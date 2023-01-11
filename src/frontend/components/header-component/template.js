import { html } from 'lit';

export function template () {
  return html`<header>
    <h1>
      Blog App
    </h1>

    <nav>
    ${this.loggedIn
      ? html`
      <a href="/user">
      Home
      </a>
      <a href="/user">
        See User Data
      </a>
      <a href="/logout">
          Logout
        </a>
      `
      : html`
        <a href="/login">
          Login
        </a>
      `}
    </nav> 
  </header>`;
}
