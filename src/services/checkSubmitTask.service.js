const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

const createCheckSubmitTask = async (checkSubmitTaskBody) => {
  const submitTask = await prisma.submitTask.findUnique({
    where: {
      id: checkSubmitTaskBody.submitTaskId,
    },
  });

  if (checkSubmitTaskBody.result == true) {
    await prisma.submitTask.update({
      where: {
        id: submitTask.id,
      },
      data: { result: true },
    });
  }

  return prisma.checkSubmitTask.create({
    data: checkSubmitTaskBody,
  });
};

const queryCheckSubmitTasks = async (filter, options) => {
  const checkSubmitTasks = await prisma.checkSubmitTask.findMany();
  return checkSubmitTasks;
};

const getCheckSubmitTaskById = async (id) => {
  return prisma.checkSubmitTask.findFirst({
    where: {
      id,
    },
  });
};

const updateCheckSubmitTaskById = async (checkSubmitTaskId, updateBody) => {
  const checkSubmitTask = await getCheckSubmitTaskById(checkSubmitTaskId);
  if (!checkSubmitTask) {
    throw new ApiError(httpStatus.NOT_FOUND, 'checkSubmitTask not found');
  }

  const updateCheckSubmitTask = await prisma.checkSubmitTask.update({
    where: {
      id: checkSubmitTaskId,
    },
    data: updateBody,
  });

  return updateCheckSubmitTask;
};

const deleteCheckSubmitTaskById = async (checkSubmitTaskId) => {
  const checkSubmitTask = await getCheckSubmitTaskById(checkSubmitTaskId);
  if (!checkSubmitTask) {
    throw new ApiError(httpStatus.NOT_FOUND, 'checkSubmitTask not found');
  }

  const deleteCheckSubmitTasks = await prisma.checkSubmitTask.deleteMany({
    where: {
      id: checkSubmitTaskId,
    },
  });

  return deleteCheckSubmitTasks;
};

module.exports = {
  createCheckSubmitTask,
  queryCheckSubmitTasks,
  getCheckSubmitTaskById,
  updateCheckSubmitTaskById,
  deleteCheckSubmitTaskById,
};
