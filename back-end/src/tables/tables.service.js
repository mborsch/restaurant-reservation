const { queryBuilder, select } = require("../db/connection");
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

async function update(updatedTable, updatedReservation) {
  const trx = await knex.transaction();

  return trx("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*")
    .then(() => {
      return trx("reservations")
        .select("*")
        .where({ reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation, "*");
    })
    .then(trx.commit)
    .catch(trx.rollback);
}

function read(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}

function resRead(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

module.exports = {
  create,
  update,
  read,
  list,
  resRead,
};
