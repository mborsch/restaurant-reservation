const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

/*
async function reservationValidation(req, res, next) {
  if (!req.body.data) {
    return next({ status: 400, message: `Data missing!`})
  }
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = req.body.data;

}
*/

async function hasValidTimeAndDate(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const date = new Date(reservation_date);
  const today = new Date();
  const reservationDate = new Date(reservation_date).toUTCString();

  if (reservationDate.includes("Tue")) {
    return next({
      status: 400,
      message: "Sorry, we are closed on Tuesday. Please choose another day.",
    });
  }

  if (
    date.valueOf() < today.valueOf() &&
    date.toUTCString().slice(0, 16) !== today.toUTCString().slice(0, 16)
  ) {
    return next({
      status: 400,
      message: "Reservations must be made in the future.",
    });
  }

  if (reservation_time < "10:30" || reservation_time > "21:30") {
    return next({
      status: 400,
      message:
        "The restaurant accepts reservations between 10:30 AM and 9:30 PM. Please choose another time.",
    });
  }

  next();
}

async function list(req, res) {
  const { date } = req.query;
  const data = await service.list(date);
  console.log(date);
  console.log(data);
  res.json({ data: data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasOnlyValidProperties,
    hasValidTimeAndDate,
    asyncErrorBoundary(create),
  ],
};
