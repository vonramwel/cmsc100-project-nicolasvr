import tap from 'tap';
import { build } from '../../../src/app.js';
import 'must/register.js';
import Chance from 'chance';

const chance = new Chance();

tap.mochaGlobals();

const prefix = '/api';

describe('Update a comment should work', async () => {
  let app;

  before(async () => {
    app = await build({
      forceCloseConnections: true
    });
  });

  const newUser = {
    username: chance.email({ domain: 'example.com' }),
    password: chance.string({ length: 12 }),
    firstName: chance.first(),
    lastName: chance.last()
  };

  let cookie = '';

  it('Should return the user that was created a new user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/register`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expect that id exists
    result.username.must.be.equal(newUser.username);
    result.firstName.must.be.equal(newUser.firstName);
    result.lastName.must.be.equal(newUser.lastName);

    // expect createdDate and updatedDate is not null
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });

  it('Login should work', async () => {
    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: newUser.username,
        password: newUser.password
      })
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    cookie = response.headers['set-cookie'];
  });

  it('Should update the object given an ID', async () => {
    const newComment = {
      data: 'comment'
    };

    const newerComment = {
      data: 'comment 2'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/blog/259a59be-80c0-4e13-85b0-362cbcb899f4/comment`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newComment)
    });

    const { id, createdDate, editedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/blog/259a59be-80c0-4e13-85b0-362cbcb899f4/comment/${id}`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newerComment)
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    result.data.must.be.equal(newerComment.data);

    // expect createdDate and editedDate is not null
    result.createdDate.must.equal(createdDate);
    result.editedDate.must.above(editedDate);
  });

  it('Logout should work', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `${prefix}/logout`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      }
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);
  });

  it('Login should work', async () => {
    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'vrnicolas',
        password: 'hello'
      })
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    cookie = response.headers['set-cookie'];
  });

  it('it should not allow other user to change other user comment', async () => {
    const newComment = {
      data: 'comment'
    };

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/blog/259a59be-80c0-4e13-85b0-362cbcb899f4/comment/beb179b8-0289-425c-8126-73f713813106`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newComment)
    });

    response.statusMessage.must.be.equal('Forbidden');
  });

  after(async () => {
    await app.close();
  });
});
