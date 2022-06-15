import type { RouteShorthandOptions } from "fastify";
import type { SourceSiteConfig } from "@lawbrador/shared";
import { hashObject } from "@lawbrador/shared";

export function routeConfig(
  response: any,
  request: any | null = null
): RouteShorthandOptions {
  const options: RouteShorthandOptions = { schema: {} };
  if (request) {
    options.schema!.body = request;
  }
  options.schema!.response = { 200: response };
  return options;
}

export function createHash(
  searchParams: Record<string, string>,
  config: SourceSiteConfig
): string {
  return hashObject({
    ...searchParams,
    configId: config._id,
  });
}
