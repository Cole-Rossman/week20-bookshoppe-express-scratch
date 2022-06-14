const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/books/:id should return a list of books with nested authors', async () => {
    const res = await request(app).get('/books/3');
    expect(res.body.length).toEqual(5);
    const twilight = res.body.find((book) => book.id === '3');
    expect(twilight).toHaveProperty('title', 'Twilight');
    expect(twilight).toHaveProperty('released', '2005');
    expect(twilight).toHaveProperty('authors');
    expect(twilight.authors[0]).toHaveProperty('author_name');
    expect(twilight.authors[0]).toHaveProperty('author_id');
    expect(twilight.authors[0]).toHaveProperty('id');
  });

  afterAll(() => {
    pool.end();
  });
});
