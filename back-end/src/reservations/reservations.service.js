const { queryBuilder, select } = require("../db/connection");
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

const addReservation = mapProperties({
  first_name: "reservation.first_name",
  last_name: "reservation.last_name",
  mobile_number: "reservation.mobile_number",
  reservation_date: "reservation.reservation_date",
  reservation_time: "reservation.reservation_time",
  people: "reservation.people",
});

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRes) => createdRes[0]);
}

function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function update(reservationId, updatedStatus) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .update(updatedStatus, "*");
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  create,
  list,
  read,
  update,
  search,
};
