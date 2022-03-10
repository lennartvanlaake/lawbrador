import type { FastifyInstance, onRequestHookHandler } from "fastify";
import type { LoginRequest, LoginResponse } from "@lawbrador/shared";
import { Schemas, Endpoints, Errors } from "@lawbrador/shared";
import { routeConfig } from "./utils";

export default async (fastify: FastifyInstance) => { 

  const adminPassword = process.env.ADMIN_PASSWORD ?? "password";
  console.log(adminPassword);
  fastify.post<{ Body: LoginRequest; Response: LoginResponse }>(
    Endpoints.LOGIN,
    routeConfig(Schemas.loginResponse, Schemas.loginRequest),
    async (req) => {
      console.log(adminPassword);
      console.log(req.body.password);
      if (req.body.password != adminPassword) {
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
