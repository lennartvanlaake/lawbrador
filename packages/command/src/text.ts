import Router from 'koa-router';
import type { TextMessage } from '@legalthingy/shared';
import { MESSAGE_TOPIC } from '@legalthingy/shared';
import { producer } from './kafka.js';

export const textRouter = new Router();

textRouter.post('/', async (ctx, next) => {
	const requestBody: TextMessage = ctx.request.body;
	try {
		await producer.send({
			topic: MESSAGE_TOPIC,
			messages: [{ value: requestBody.message }],
		});
		ctx.body = 'thanks!';
	} catch (e: any) {
		console.error(e);
		ctx.body = e.message;
		ctx.status = 500;
	}
	await next();
});
