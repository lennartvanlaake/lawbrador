import { clean, LAWBRADOR_CLIENT } from "@lawbrador/db";

async function cleanDb() {
  await LAWBRADOR_CLIENT.connect();
  console.log("deleting everything...");
  await clean(LAWBRADOR_CLIENT);
  console.log("done deleting");
  process.exit();
}

cleanDb();
