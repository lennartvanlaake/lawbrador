import { textRouter } from './text.js';
import { DefaultState, Context, DefaultContext } from 'koa';
import Koa from 'koa';
import Router from 'koa-router';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

// base config
export const app = new Koa<DefaultState, DefaultContext>();
const router = new Router<DefaultState, Context>();
const port = process.env.PORT || 5001;

// middleware
app.use(json());
app.use(bodyParser());
app.use(logger());

router.use('/api/text', textRouter.routes(), textRouter.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, async () => {
	console.log(`Server is up at port ${port}`);
});
