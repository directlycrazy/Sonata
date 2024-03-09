import express, { Request, Response } from "express";
import next from "next";
import morgan from 'morgan';
import router from './server/router';

const port = parseInt(process.env.PORT as string, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	server.use(morgan('tiny'));
	server.use('/api', router);

	server.all('*', (req: Request, res: Response) => {
		return handle(req, res);
	});

	server.listen(port, () => {
		console.log(`Ready on http://localhost:${port}`);
	});
});