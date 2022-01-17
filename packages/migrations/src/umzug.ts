import { DB_NAME, LAWBRADOR_CLIENT } from "@lawbrador/shared/src/db/constants";
import { Umzug, MongoDBStorage } from "umzug";

(async () => {
  await LAWBRADOR_CLIENT.connect();
})();

export const migrator = new Umzug({
  migrations: {
    glob: ["migrations/*.ts", { cwd: "." }],
    resolve: (params) => {
      if (params.path.endsWith(".ts")) {
        const getModule = () =>
          import(`file:///${params.path.replace(/\\/g, "/")}`);
        return {
          name: params.name,
          path: params.path,
          up: async (upParams) => (await getModule()).up(upParams),
          down: async (downParams) => (await getModule()).down(downParams),
        };
      }
      return {
        name: params.name,
        path: params.path,
        ...require(params.path),
      };
    },
  },
  storage: new MongoDBStorage({
    collection: LAWBRADOR_CLIENT.db(DB_NAME).collection("migraitons"),
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;
