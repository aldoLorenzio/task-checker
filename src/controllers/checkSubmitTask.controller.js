const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { checkSubmitTaskService } = require('../services');

const createCheckSubmitTask = catchAsync(async (req, res) => {
  const checkSubmitTask = await checkSubmitTaskService.createCheckSubmitTask(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Create checkSubmitTask Success',
    data: checkSubmitTask,
  });
});

const getCheckSubmitTasks = catchAsync(async (req, res) => {
  const filter = { checkSubmitTask: req.query.checkSubmitTask };
  const options = {
    sortBy: req.query.sortBy,
    take: req.query.take,
    skip: req.query.skip,
  };

  const result = await checkSubmitTaskService.queryCheckSubmitTasks(filter, options);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get checkSubmitTasks Success',
    data: result,
  });
});

const getCheckSubmitTask = catchAsync(async (req, res) => {
  const checkSubmitTask = await checkSubmitTaskService.getCheckSubmitTaskById(req.params.checkSubmitTaskId);
  if (!checkSubmitTask) {
    throw new ApiError(httpStatus.NOT_FOUND, 'checkSubmitTask not found');
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get checkSubmitTask Success',
    data: checkSubmitTask,
  });
});

const updateCheckSubmitTask = catchAsync(async (req, res) => {
  const checkSubmitTask = await checkSubmitTaskService.updateCheckSubmitTaskById(req.params.checkSubmitTaskId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Update checkSubmitTask Success',
    data: checkSubmitTask,
  });
});

const deleteCheckSubmitTask = catchAsync(async (req, res) => {
  await checkSubmitTaskService.deleteCheckSubmitTaskById(req.params.checkSubmitTaskId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Delete checkSubmitTask Success',
    data: null,
  });
});

module.exports = {
  createCheckSubmitTask,
  getCheckSubmitTasks,
  getCheckSubmitTask,
  updateCheckSubmitTask,
  deleteCheckSubmitTask,
};
