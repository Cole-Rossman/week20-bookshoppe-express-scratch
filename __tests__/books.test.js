const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('/books/ should return a list of books', async () => {
    const resp = await request(app).get('/books');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      { id: '1', title: 'The Old Man and the Sea', released: '1952' },
      { id: '2', title: 'A Farewell to Arms', released: '1929' },
      { id: '3', title: 'Twilight', released: '2005' },
      { id: '4', title: 'It', released: '1986' },
      { id: '5', title: 'The Shining', released: '1977' },
      { id: '6', title: 'The Lightning Thief', released: '2005' },
      { id: '7', title: 'The Sea of Monsters', released: '2006' },
    ]);
  });

  it.skip('/books/:id should return a list of books with nested authors', async () => {
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

  it.skip('POST /books should create a new book with an associated author', async () => {
    const resp = await request(app)
      .post('/books')
      .send({ title: 'New Moon', released: '2006', AuthorIds: [2] });
    expect(resp.status).toBe(200);
    expect(resp.body.title).toBe('New Moon');

    // { body: new_moon } destructuring body and renaming it new_moon. A little trick
    const { body: new_moon } = await request(app).get(`/books/${resp.body.id}`);
    expect(new_moon.authors.length).toBe(1);
  });

  afterAll(() => {
    pool.end();
  });
});
