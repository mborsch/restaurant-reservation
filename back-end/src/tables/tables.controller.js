const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const VALID_PROPERTIES = ["table_name", "capacity"];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid Field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

function tableNameValidator(req, res, next) {
  const { table_name } = req.body.data;
  const length = table_name.length;

  if (length >= 2) {
    return next();
  }
  return next({
    status: 400,
    message: `Invalid table name field. Table name must be at 2 characters or more.`,
  });
}

function capacityValidator(req, res, next) {
  const { capacity } = req.body.data;

  if (capacity > 0 && Number.isInteger(capacity)) {
    return next();
  }
  return next({
    status: 400,
    message: `Invalid capacity field. Capacity must be greater than 0.`,
  });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [capacityValidator, tableNameValidator, asyncErrorBoundary(create)],
};
