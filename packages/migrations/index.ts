import { mongoMigrateCli } from 'mongo-migrate-ts';

mongoMigrateCli({
  uri: 'mongodb://localhost:27017?replicaSet=rs0&readPreference=primary&ssl=false',
  database: 'lawbrador',
  migrationsDir: `${__dirname}/scripts`,
  migrationsCollection: 'migrations_collection',
});
