import Router from 'koa-router';

export const textRouter = new Router();

textRouter.post('/', async (ctx, next) => {
	ctx.body = 'bla';
	await next();
});

textRouter.get('/', async (ctx, next) => {
	ctx.body = 'bla';
	await next();
});
