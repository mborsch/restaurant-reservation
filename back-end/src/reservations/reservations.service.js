const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

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