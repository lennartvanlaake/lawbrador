import addFormats from "ajv-formats";
import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true });

export default addFormats(ajv, [
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
