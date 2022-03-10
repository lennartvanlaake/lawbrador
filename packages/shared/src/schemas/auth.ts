import { Type } from "@sinclair/typebox";

export const loginRequest = Type.Object({
  password: Type.String(),
});

export const loginResponse = Type.Object({
  jwt: Type.String(),
});
