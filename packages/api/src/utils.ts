import { TSchema } from '@sinclair/typebox';
import { RouteShorthandOptions } from 'fastify';

export function routeConfig(response: TSchema, request: TSchema = null): RouteShorthandOptions {
	const options: RouteShorthandOptions = { schema: {} };
	if (request) {
		options.schema.body = request;	
	}
	options.schema.response = { 200: response };
	return options;
}
