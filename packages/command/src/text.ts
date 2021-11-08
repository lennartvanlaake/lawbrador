/// <reference types="@legalthingy/shared"/>

import Router from 'koa-router';
import { TextMessage } from 'packages/shared/src/shared.js';
import { producer } from './kafka.js';
import { assertType } from 'typescript-is';

export const textRouter = new Router();

textRouter.post('/', async (ctx, next) => {
	assertType<TextMessage>(ctx.request.body);
	const requestBody: TextMessage = ctx.request.body;
	producer.send({
		topic: 'text',
		messages: [{ value: requestBody.message }],
	});
	ctx.body = 'bla';
	await next();
});

textRouter.get('/', async (ctx, next) => {
	ctx.body = 'Thanks mate!';
	await next();
});
