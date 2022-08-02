const service = require("./tables.service");
const reservationService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const { as } = require("../db/connection");
const { response } = require("../app");

function dataExists(req, res, next) {
  if (!req.body.data) {
    return next({
      status: 400,
      message: `Data missing!`,
    });
  }
  next();
}

function tableNameValidator(req, res, next) {
  const { table_name } = req.body.data;

  if (!table_name) {
    return next({
      status: 400,
      message: `missing table_name data.`,
    });
  }
  const length = table_name.length;
  if (!length) {
    return next({
      status: 400,
      message: `table_name can't be left blank.`,
    });
  }

  if (length >= 2) {
    return next();
  }
  return next({
    status: 400,
    message: `Invalid table_name field. Table name must be at 2 characters or more.`,
  });
}

function capacityValidator(req, res, next) {
  const { capacity } = req.body.data;

  if (capacity > 0) {
    return next();
  }
  return next({
    status: 400,
    message: `Invalid capacity field. Capacity (${capacity}) must be greater than 0.`,
  });
}

function CapacityNaN(req, res, next) {
  let { capacity } = req.body.data;

  if (capacity > 0 && Number.isInteger(capacity)) {
    return next();
  }
  return next({
    status: 400,
    message: `Invalid capacity field. Capacity must be a positive integer greater than 0`,
  });
}

async function tableExists(request, response, next) {
  const { table_id } = request.params;

  let table = await service.read(table_id);

  const error = { status: 404, message: `Table ${table_id} cannot be found.` };

  if (table) {
    response.locals.table = table;
    return next();
  }

  next(error);
}

////////////////////////
//END  MIDDLEWARE
////////////////////////

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data: data });
}

async function read(req, res, next) {
  response.json({
    data: res.locals.table,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  tableExists,
  create: [
    dataExists,
    capacityValidator,
    CapacityNaN,
    tableNameValidator,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
};
