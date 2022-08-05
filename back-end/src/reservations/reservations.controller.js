const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

function hasOnlyValidProperties(req, res, next) {
  if (!req.body.data) {
    return next({ status: 400, message: "Data missing" });
  }
  const {
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_date,
    reservation_time,
  } = req.body.data;

  if (
    !first_name ||
    !last_name ||
    !mobile_number ||
    !people ||
    !reservation_date ||
    !reservation_time
  )
    return next({
      status: 400,
      message:
        "Please complete the following: first_name, last_name, mobile_number, people, reservation_date, and reservation_time.",
    });

  if (typeof people !== "number")
    return next({ status: 400, message: "people is not a number!" });

  if (!reservation_date.match(/\d{4}-\d{2}-\d{2}/))
    return next({
      status: 400,
      message: "reservation_date is invalid!",
    });

  next();
}

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
        "reservation_time must be between 10:30 AM and 9:30 PM. Please choose another time.",
    });
  }

  next();
}

async function checkStatus(req, res, next) {
  const { status } = req.body.data;
  if (status === "seated") {
    return next({ status: 400, message: "reservation is already seated." });
  }
  if (status === "finished") {
    return next({ status: 400, message: "reservation is already finished." });
  }
  next();
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} cannot be found.`,
  });
}

async function read(req, res, next) {
  res.json({ data: res.locals.reservation });
}

async function list(req, res) {
  const { date, mobile_number } = req.query;
  let data = null;

  !date
    ? (data = await service.search(mobile_number))
    : (data = await service.list(date));

  data = data.filter((each) => {
    return each.status !== "finished";
  });

  res.json({ data: data });
}

async function update(req, res) {
  const { reservation } = res.locals;

  const updatedReservation = { ...reservation, ...req.body.data };
  const { reservation_id } = reservation;

  const data = await service.update(reservation_id, updatedReservation);

  res.json({ data: data[0] });
}

async function create(req, res, next) {
  const data = await service.create(req.body.data);

  res.status(201).json({ data });
}

async function updateStatus(req, res, next) {
  const updatedStatus = req.body.data.status;
  const validStatus = ["booked", "seated", "finished", "cancelled"];
  const { reservation } = res.locals;
  const { reservation_id } = reservation;
  let { status } = reservation;
  if (!validStatus.includes(updatedStatus)) {
    return next({
      status: 400,
      message: "cannot update with an unknown status.",
    });
  }
  if (status === "finished") {
    return next({
      status: 400,
      message: "cannot update a finished reservation.",
    });
  }

  const updatedReservation = { ...reservation, ...req.body.data };

  const data = await service.update(reservation_id, updatedReservation);

  res.json({ data: { status: updatedStatus } });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  create: [
    hasOnlyValidProperties,
    hasValidTimeAndDate,
    asyncErrorBoundary(checkStatus),
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    hasOnlyValidProperties,
    hasValidTimeAndDate,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(updateStatus),
  ],
};
