const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should return a list of authors with nested books', async () => {
    const res = await request(app).get('./authors');
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
  afterAll(() => {
    pool.end();
  });
});
