const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/api/v1/authors/ should return a list of authors', async () => {
    const resp = await request(app).get('/api/v1/authors');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      { id: '1', author_name: 'Ernest Hemingway' },
      { id: '2', author_name: 'Stephenie Meyer' },
      { id: '3', author_name: 'Stephen King' },
    ]);
  });

  it('/api/v1/authors/:id should return a list of authors with nested books', async () => {
    const resp = await request(app).get('/api/v1/authors/1');
    expect(resp.status).toBe(200);
    expect(resp.body.id).toEqual('1');
    expect(resp.body.author_name).toEqual('Ernest Hemingway');
    expect(resp.body).toHaveProperty('books');
  });

  // it('POST /authors should create a new author', async () => {
  //   const resp = await request(app).post('/authors').send({ author_name: 'Louis Sachar' });
  //   expect(resp.status).toBe(200);
  //   expect(resp.body.author_name).toBe('Louis Sachar');
  // });

  it('POST /authors should create a new author with an associated book', async () => {
    const resp = await request(app)
      .post('/api/v1/authors')
      .send({ author_name: 'Rick Riordan', dob: '06-05-1964', pob: 'San Antonio, TX', bookIds: [6, 7] });
    expect(resp.status).toBe(200);
    expect(resp.body.author_name).toBe('Rick Riordan');

    // { body: rick } destructuring body and renaming it rick. A little trick
    const { body: rick } = await request(app).get(`/api/v1/authors/${resp.body.id}`);
    expect(rick.books.length).toBe(2);
  });


  afterAll(() => {
    pool.end();
  });
});
