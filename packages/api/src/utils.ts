import { TSchema } from '@sinclair/typebox';
import { RouteShorthandOptions } from 'fastify';
import { hashObject, SourceSiteConfig } from "@lawbrador/shared";

export function routeConfig(response: TSchema, request: TSchema = null): RouteShorthandOptions {
	const options: RouteShorthandOptions = { schema: {} };
	if (request) {
		options.schema.body = request;	
	}
	options.schema.response = { 200: response };
	return options;
}

export function createHash(searchParams: Record<string, string>, config: SourceSiteConfig): string {
	return hashObject({
		...searchParams,
		configId: config._id
	})
}
