/*
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tables")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tables").insert([
        { table_name: "Bar #1", capacity: 1 },
        { table_name: "Bar #1", capacity: 1 },
        { table_name: "#1", capacity: 6 },
        { table_name: "#2", capacity: 6 },
      ]);
    });
};
*/
const tables = require("./01-tables.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("tables").insert(tables);
    });
};
