import type { Static } from "@sinclair/typebox";
import type { loginRequest, loginResponse } from "./auth";

export type LoginRequest = Static<typeof loginRequest>;
export type LoginResponse = Static<typeof loginResponse>;
