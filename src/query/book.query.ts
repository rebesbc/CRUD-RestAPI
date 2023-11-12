export const QUERY = {
    SELECT_BOOKS: 'SELECT * FROM books ORDER BY release_date DESC LIMIT 50',
    SELECT_BOOK: 'SELECT * FROM books WHERE id = ?',
    CREATE_BOOK: 'INSERT INTO books (title, author, publisher, isbn, release_date) VALUES(?, ?, ?, ?, ?)',
    UPDATE_BOOK: 'UPDATE books SET title = ?, author = ?, publisher = ?, isbn = ?, release_date = ? WHERE id = ?',
    DELETE_BOOK: 'DELETE FROM books WHERE id = ?'
};