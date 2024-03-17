import express, { Request, Response } from "express";
import next from "next";
import morgan from 'morgan';
import router from './server/router';
import { CSRF, Auth } from "./server/auth";

const port = parseInt(process.env.PORT as string, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, hostname: '127.0.0.1', port });

const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	if (!dev) server.use(morgan('tiny'));
	// server.use(CSRF);
	server.use(Auth);
	server.use('/api', router);

	server.all('*', (req: Request, res: Response) => {
		const path = req.path ?? "";
		//Allow some public routes, and next assets to be available without auth
		if (path.startsWith('/track/') || path.startsWith('/album/') || path.startsWith('/artist/') || path.startsWith('/_next/') && !res.locals.user) return handle(req, res);
		if (!res.locals.user) return app.render(req, res, '/login');
		//Only set the player url if the user is logged in
		req.headers['player_url'] = process.env.PLAYER_URL as string
		return handle(req, res);
	});

	server.listen(port, () => {
		console.log(`Ready on http://localhost:${port}`);
	});
});