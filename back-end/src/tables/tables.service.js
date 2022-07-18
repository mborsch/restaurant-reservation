const { queryBuilder, select } = require("../db/connection");
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

function read(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

module.exports = {
  create,
  read,
  list,
};
