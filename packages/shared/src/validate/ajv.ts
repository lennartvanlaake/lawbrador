import addFormats from "ajv-formats";
import Ajv from "ajv";
import {} from "@lawbrador/shared";

//@ts-ignore
export const ajv: Ajv = addFormats(new Ajv({ allErrors: true }), [
  "date-time",
  "time",
  "date",
  "email",
  "hostname",
  "ipv4",
  "ipv6",
  "uri",
  "uri-reference",
  "uuid",
  "uri-template",
  "json-pointer",
  "relative-json-pointer",
  "regex",
])
  .addKeyword("kind")
  .addKeyword("modifier");
