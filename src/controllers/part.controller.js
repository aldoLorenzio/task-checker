const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { partService } = require('../services');

const createPart = catchAsync(async (req, res) => {
  const part = await partService.createPart(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Create Part Success",
    data: part
  });
});

const getParts = catchAsync(async (req, res) => {
  const filter = { part: req.query.part }
  const options = {
    sortBy: req.query.sortBy,
    take: req.query.take,
    skip: req.query.skip,
  }

  const result = await partService.queryParts(filter, options);
  
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get Parts Success",
    data: result
  });
});

const getPart = catchAsync(async (req, res) => {
  const part = await partService.getPartById(req.params.partId);
  if (!part) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Part not found');
  }
  
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get Part Success",
    data: part
  });
});

const updatePart = catchAsync(async (req, res) => {
  const part = await partService.updatePartById(req.params.partId, req.body);
  
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Update Part Success",
    data: part
  });
});

const deletePart = catchAsync(async (req, res) => {
  await partService.deletePartById(req.params.partId);
  
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Delete Part Success",
    data: null
  });
});

module.exports = {
  createPart,
  getParts,
  getPart,
  updatePart,
  deletePart,
};
