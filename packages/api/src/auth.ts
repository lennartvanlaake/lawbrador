import type { FastifyInstance, FastifyPlugin, FastifyRequest, onRequestHookHandler } from "fastify";
import type { LoginRequest, LoginResponse } from "@lawbrador/shared";
import { Schemas, Endpoints, Errors } from "@lawbrador/shared";
import { routeConfig } from "./utils";

export default async (fastify: FastifyInstance) => {
  fastify.post<{ Body: LoginRequest; Response: LoginResponse }>(
    Endpoints.LOGIN,
    routeConfig(Schemas.loginResponse, Schemas.loginRequest),
    async (req) => {
      if (req.body.password != process.env.ADMIN_PASSWORD ?? "password") {
        throw new Error(Errors.INCORRECT_CREDENTIALS);
      }
      return { jwt: fastify.jwt.sign({ user: "admin" }) };
    }
  );
};

export function auth(fastify: FastifyInstance): onRequestHookHandler {
  return (req, _, done) => {
    if (!fastify.jwt.verify(req.headers.authorization ?? "")) {
      throw new Error(Errors.NOT_PERMITTED);
    }
    done();
  };
}
