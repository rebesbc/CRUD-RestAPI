import { Request, Response } from 'express'
import { Book } from '../interface/book';
import { connection } from '../config/mysql.config';
import { Code } from '../enum/code.enum';
import { QUERY } from '../query/book.query';
import { HttpResponse } from '../domain/response';
import { Status } from '../enum/status.enum';
import { FieldPacket, OkPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

type ResultSet = [OkPacket | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | OkPacket[] | ProcedureCallPacket, FieldPacket[]];

export const getBooks = async (req: Request, res: Response): Promise<Response<Book[]>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]}${req.rawHeaders[1]}`) // host: req.rawHeaders[0], ip's host: req.rawHeaders[1]
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_BOOKS);
        return res.status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'Books retrieved', result[0])) // lista de todos los ítems en 'books': result[0]
    } catch(error: unknown) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'))
    }
};

export const getBook = async (req: Request, res: Response): Promise<Response<Book>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]}${req.rawHeaders[1]}`) // host: req.rawHeaders[0], ip's host: req.rawHeaders[1]
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_BOOK, [req.params.bookId]);
        if ((result[0] as Array<ResultSet>).length > 0) { // si MySQL no regresa ningún dato, no lo halló
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, 'Book retrieved', result[0])) // lista del ítem buscado en 'books': result[0]
        }
        else {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Book not found'))
        }
        
    } catch(error: unknown) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'))
    }
};

export const createBook = async (req: Request, res: Response): Promise<Response<Book>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]}${req.rawHeaders[1]}`) // host: req.rawHeaders[0], ip's host: req.rawHeaders[1]
    let book: Book = { ...req.body };
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.CREATE_BOOK, Object.values(book));
        book = { id: (result[0] as ResultSetHeader).insertId, ...req.body }; // obtener información del book a través del id creado en su result
        return res.status(Code.CREATED)
                .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Book created', book))
    } catch(error: unknown) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'))
    }
};