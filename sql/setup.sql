-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors_books CASCADE;

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_name VARCHAR,
    dob DATE,
    pob VARCHAR
);

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR,
    released INT
);

CREATE TABLE authors_books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    book_id BIGINT,
    author_id BIGINT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO authors (
    author_name,
    dob,
    pob
)
VALUES
  ('Ernest Hemingway', '07-21-1899', 'Oak Park, IL'),
  ('Stephen King', '09-21-1947', 'Portland, ME'),
  ('Stephenie Meyer', '12-24-1973', 'Hartford, CT');

INSERT INTO books (
    title,
    released
)
VALUES
  ('The Old Man and the Sea', '1952'),
  ('A Farewell to Arms', '1929'),
  ('Twilight', '2005'),
  ('It', '1986'),
  ('The Shining', '1977');

  INSERT INTO authors_books(
      author_id,
      book_id
  )
  VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 4),
    (3, 5);