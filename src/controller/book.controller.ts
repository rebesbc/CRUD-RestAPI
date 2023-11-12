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