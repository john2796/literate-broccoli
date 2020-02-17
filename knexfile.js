// Update with your config settings.
require("dotenv").config();
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/database.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  production: {
    client: "pg",
    // connection: process.env.DATABASE_URL,
    connection:
      "postgres://tewmhesgbiikoj:cdc2f0994e078ed9cd41d5400f4077bc8f1ce3c98f8d5c8cf2c0581fd9542682@ec2-3-234-109-123.compute-1.amazonaws.com:5432/d275jprmhcs59r",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    useNullAsDefault: true
  }
};
