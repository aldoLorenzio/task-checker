const httpStatus = require('http-status');
const prisma = require('../../prisma/client')
const ApiError = require('../utils/ApiError');


const createcheckSubmitTask = async (checkSubmitTaskBody) => {

  return prisma.checkSubmitTask.create({
    data: checkSubmitTaskBody
  });
};


const querycheckSubmitTasks = async (filter, options) => {
  const checkSubmitTasks = await prisma.checkSubmitTask.findMany();
  return checkSubmitTasks;
};

const getcheckSubmitTaskById = async (id) => {
  return prisma.checkSubmitTask.findFirst({
    where: {
      id: id
    }
  })
};


const updatecheckSubmitTaskById = async (checkSubmitTaskId, updateBody) => {
  const checkSubmitTask = await getcheckSubmitTaskById(checkSubmitTaskId);
  if (!checkSubmitTask) {
    throw new ApiError(httpStatus.NOT_FOUND, 'checkSubmitTask not found');
  }
  
  const updatecheckSubmitTask = await prisma.checkSubmitTask.update({
    where: {
      id: checkSubmitTaskId,
    },
    data: updateBody
  })

  return updatecheckSubmitTask;
};


const deletecheckSubmitTaskById = async (checkSubmitTaskId) => {
  const checkSubmitTask = await getcheckSubmitTaskById(checkSubmitTaskId);
  if (!checkSubmitTask) {
    throw new ApiError(httpStatus.NOT_FOUND, 'checkSubmitTask not found');
  }

  const deletecheckSubmitTasks = await prisma.checkSubmitTask.deleteMany({
    where: {
      id: checkSubmitTaskId
    },
  })

  return deletecheckSubmitTasks;
};

module.exports = {
  createcheckSubmitTask,
  querycheckSubmitTasks,
  getcheckSubmitTaskById,
  updatecheckSubmitTaskById,
  deletecheckSubmitTaskById,
};
