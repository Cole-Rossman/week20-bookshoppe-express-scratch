const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('/authors/ should return a list of authors', async () => {
    const resp = await request(app).get('/authors');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      { id: '1', name: 'Ernest Hemingway' },
      { id: '2', name: 'Stephen King' },
      { id: '3', name: 'Stephenie Meyer' },
    ]);
  });

  it.skip('/authors/:id should return a list of authors with nested books', async () => {
    const res = await request(app).get('/authors/1');
    expect(res.body.length).toEqual(3);
    const ernest = res.body.find((author) => author.id === '1');
    expect(ernest).toHaveProperty('author_name', 'Ernest Hemingway');
    expect(ernest).toHaveProperty('dob', '07-21-1899');
    expect(ernest).toHaveProperty('pob', 'Oak Park, IL');
    expect(ernest).toHaveProperty('books');
    expect(ernest.books[0]).toHaveProperty('title');
    expect(ernest.books[0]).toHaveProperty('released');
    expect(ernest.books[0]).toHaveProperty('book_id');
    expect(ernest.books[0]).toHaveProperty('id');
  });

  // it('POST /authors should create a new author', async () => {
  //   const resp = await request(app).post('/authors').send({ author_name: 'Louis Sachar' });
  //   expect(resp.status).toBe(200);
  //   expect(resp.body.author_name).toBe('Louis Sachar');
  // });

  it('POST /authors should create a new author with an associated book', async () => {
    const resp = await request(app)
      .post('/authors')
      .send({ author_name: 'Rick Riordan', dob: '06-05-1964', pob: 'San Antonio, TX', bookIds: [6, 7] });
    expect(resp.status).toBe(200);
    expect(resp.body.author_name).toBe('Rick Riordan');

    // { body: rick } destructuring body and renaming it rick. A little trick
    const { body: rick } = await request(app).get(`/authors/${resp.body.id}`);
    expect(rick.books.length).toBe(2);
  });


  afterAll(() => {
    pool.end();
  });
});
