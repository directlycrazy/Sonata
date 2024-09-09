import { and, eq } from 'drizzle-orm';
import { db } from 'drizzle/db';
import { history, liked } from 'drizzle/schema';
import express, { Request, Response } from 'express';
import { GetTrack } from './data/track';

const router = express.Router();

router.get('/liked/:id', async (req: Request, res: Response) => {
    if (!req.params.id || isNaN(Number(req.params.id))) return res.sendStatus(400);
    try {
        const data = await db.query.liked.findFirst({
            where: and(eq(liked.trackId, req.params.id), eq(liked.userId, res.locals.user.id))
        })
        if (data) {
            res.send({ liked: true });
        } else {
            res.send({ liked: false });
        }

    } catch (e) {
        res.send({ liked: false });
    }

    //Add to user history

    try {
        const track = await GetTrack(req.params.id).catch(() => { });
        await db.insert(history).values({
            trackId: track.id,
            userId: res.locals.user.id
        })
    } catch (e) {
        console.log(e);
    }
})

export default router;