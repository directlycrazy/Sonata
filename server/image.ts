import express from 'express';
import { Readable } from 'stream';
import type { ReadableStream } from 'node:stream/web';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const url = new URL(req.query.q as string);
		if (url.host !== "e-cdns-images.dzcdn.net" && url.host !== "cdn-images.dzcdn.net") return res.sendStatus(403);
		const data = await fetch(url.toString());
		if (data.body !== null) {
			Readable.fromWeb(data.body as ReadableStream<Uint8Array>).pipe(res);
		}
	} catch (e) {
		return res.sendStatus(500);
	}
})

export default router;