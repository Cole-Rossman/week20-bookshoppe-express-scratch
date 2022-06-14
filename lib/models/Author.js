const pool = require('../utils/pool');

class Author {
  id;
  author_name;
  dob;
  pob;
  books;

  constructor(row) {
    this.id = row.id;
    this.author_name = row.author_name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books = row.books ?? [];
  }

  static async insert({ author_name, dob, pob }) {
    const { rows } = await pool.query('INSERT INTO authors (author_name, dob, pob) VALUES ($1, $2, $3) RETURNING *', [author_name, dob, pob]);
    console.log('rows', rows);
    return new Author(rows[0]);
  }
  // no static because we are working with an instance. Also this.id is using the id of the instance we are working with.
  async addBookById(bookId) {
    await pool.query('INSERT INTO authors_books (author_id, book_id) VALUES ($1, $2) RETURNING *', [this.id, bookId]);
    return this;
  }
}

module.exports = { Author };
