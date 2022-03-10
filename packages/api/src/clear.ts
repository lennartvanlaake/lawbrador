import type { FastifyInstance } from "fastify";
import { Endpoints } from "@lawbrador/shared";
import { clean } from "@lawbrador/db";
import { auth } from "./auth";

export default async (fastify: FastifyInstance) => {
  fastify.route({
    url: Endpoints.ALL,
    method: "DELETE",
    preHandler: auth(fastify),
    handler: async () => {
      await clean(fastify.client);
      return { status: "success" };
    },
  });
};
