import cors from "cors";
import ip from "ip";
import bookRoutes from "./routes/book.routes";
import express, { Application, response } from "express";
import { HttpResponse } from "./domain/response";
import { Code } from "./enum/code.enum";
import { Status } from "./enum/status.enum";

export class App {
    private readonly app: Application;
    private readonly APPLICATION_RUNNING = 'application is running on:';
    private readonly ROUTE_NOT_FOUND = 'Route does not exist on the server';

    constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 3000) {
        this.app = express();
        this.middleware();
        this.routes();
    }

    listen(): void {
        this.app.listen(this.port);
        console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`);
    }

    private middleware(): void {
        this.app.use(cors({origin: '*' }));
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use('/books', bookRoutes);
        this.app.get('/', (_, res) => res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Welcome to the RestAPI for Books v1.0')));
        this.app.all('*', (_, res) => res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND))); // todas las URL que no se encuentren
    }
}