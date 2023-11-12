import { Router } from 'express';
import { createBook, deleteBook, getBook, getBooks, updateBook } from '../controller/book.controller';

const bookRoutes = Router();

bookRoutes.route('/') // [template: /patients]
    .get(getBooks)
    .post(createBook);

bookRoutes.route('/:bookId') // [template: /patients/{bookId}] [example: /patients/1]
    .get(getBook)
    .put(updateBook)
    .delete(deleteBook)

export default bookRoutes;