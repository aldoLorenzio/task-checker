const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { submitTaskService } = require('../services');

const createsubmitTask = catchAsync(async (req, res) => {
  const submitTask = await submitTaskService.createSubmitTask(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Create submitTask Success",
    data: submitTask
  });
});

const getsubmitTasks = catchAsync(async (req, res) => {
  const filter = { submitTask: req.query.submitTask }
  const options ={
    sortBy: req.query.sortBy,
    take: req.query.take,
    skip: req.query.skip
  }

  const result = await submitTaskService.querysubmitTasks(filter,options);
  
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get submitTasks Success",
    data: result
  });
});

const getsubmitTask = catchAsync(async (req, res) => {
  const submitTask = await submitTaskService.getsubmitTaskById(req.params.submitTaskId);
  if (!submitTask) {
    throw new ApiError(httpStatus.NOT_FOUND, 'submitTask not found');
  }
  
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Get submitTask Success",
    data: submitTask
  });
});

const updatesubmitTask = catchAsync(async (req, res) => {
  const submitTask = await submitTaskService.updatesubmitTaskById(req.params.submitTaskId, req.body);
  
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Update submitTask Success",
    data: submitTask
  });
});

const deletesubmitTask = catchAsync(async (req, res) => {
  await submitTaskService.deletesubmitTaskById(req.params.submitTaskId);
  
  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Delete submitTask Success",
    data: null
  });
});

module.exports = {
  createsubmitTask,
  getsubmitTasks,
  getsubmitTask,
  updatesubmitTask,
  deletesubmitTask,
};
