const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;
  authors;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.authors = row.authors ?? [];
  }

  static async insert({ title, released }) {
    const { rows } = await pool.query('INSERT INTO books (title, released) VALUES ($1, $2) RETURNING *', [title, released]);
    return new Book(rows[0]);
  }

  async addAuthorById(authorId) {
    await pool.query('INSERT INTO authors_books (book_id, author_id) VALUES ($1, $2) RETURNING *', [this.id, authorId]);
    console.log('this', this);
    return this;
  }
}

module.exports = { Book };
