const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { submitTaskService } = require('../services');

const createSubmitTask = catchAsync(async (req, res) => {
  const submitTask = await submitTaskService.createSubmitTask(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Create submitTask Success',
    data: submitTask,
  });
});

const getSubmitTasks = catchAsync(async (req, res) => {
  const filter = { submitTask: req.query.submitTask };
  const options = {
    sortBy: req.query.sortBy,
    take: req.query.take,
    skip: req.query.skip,
  };

  const result = await submitTaskService.querySubmitTasks(filter, options);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get submitTasks Success',
    data: result,
  });
});

const getSubmitTask = catchAsync(async (req, res) => {
  const submitTask = await submitTaskService.getSubmitTaskById(req.params.submitTaskId);
  if (!submitTask) {
    throw new ApiError(httpStatus.NOT_FOUND, 'submitTask not found');
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get submitTask Success',
    data: submitTask,
  });
});

const updateSubmitTask = catchAsync(async (req, res) => {
  const submitTask = await submitTaskService.updateSubmitTaskById(req.params.submitTaskId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Update submitTask Success',
    data: submitTask,
  });
});

const deleteSubmitTask = catchAsync(async (req, res) => {
  await submitTaskService.deleteSubmitTaskById(req.params.submitTaskId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Delete submitTask Success',
    data: null,
  });
});

module.exports = {
  createSubmitTask,
  getSubmitTasks,
  getSubmitTask,
  updateSubmitTask,
  deleteSubmitTask,
};
