import { App } from './app'

// init, run
const start = (): void => {
    const app = new App();
    app.listen();
}

start();