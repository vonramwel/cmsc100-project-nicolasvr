import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Get a blog should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return the object given an ID', async () => {
    const newBlog = {
      title: 'New Blog for get',
      description: 'Some description'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/blog`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBlog)
    });

    const { id } = await createResponse.json();

    const response = await app.inject({
      method: 'GET',
      url: `${prefix}/blog/${id}`
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expect that id exists
    result.id.must.equal(id);
    // expect that all of the values should be equal to newTodo properties
    result.title.must.be.equal(newBlog.title);
    result.description.must.be.equal(newBlog.description);
    // expect createdDate and updatedDate is not null
    result.createdDate.must.not.be.null();
    result.editedDate.must.not.be.null();
  });
});
