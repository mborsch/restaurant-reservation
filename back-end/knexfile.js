/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require("dotenv").config();
const path = require("path");

const {
  DATABASE_URL = "postgres://juvwclxq:GeXrz0WSou_c_pFoQlWdV6x_957blVL3@jelani.db.elephantsql.com/juvwclxq",
  DATABASE_URL_DEVELOPMENT = "postgres://eqpbamao:wvRj_bCUzLvdb2KpTsJYaQ4Y0Ym1E6Xg@raja.db.elephantsql.com/eqpbamao",
  DATABASE_URL_TEST = "postgres://bhtachnm:EOcpvajV_m8qdAN4v5PDCnmJpLR3oHIl@jelani.db.elephantsql.com/bhtachnm",
  DATABASE_URL_PREVIEW = "postgres://qxmwstfk:qOB1_mn0JcLWe1UCjTuT3Tp6mczBqh-Z@raja.db.elephantsql.com/qxmwstfk",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
