const httpStatus = require('http-status');
const prisma = require('../../prisma/client')
const ApiError = require('../utils/ApiError');


const createSubmitTask = async (submitTaskBody) => {
  return prisma.submitTask.create({
    data: submitTaskBody
  });
};


const querySubmitTasks = async (filter, options) => {
  const submitTasks = await prisma.submitTask.findMany();
  return submitTasks;
};

const getSubmitTaskById = async (id) => {
  return prisma.submitTask.findFirst({
    where: {
      id: id
    }
  })
};


const updateSubmitTaskById = async (submittaskId, updateBody) => {
  const submitTask = await getSubmitTaskById(submittaskId);
  if (!submitTask) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SubmitTask not found');
  }
  
  const updateSubmitTask = await prisma.submitTask.update({
    where: {
      id: submittaskId,
    },
    data: updateBody
  })

  return updateSubmitTask;
};


const deleteSubmitTaskById = async (submittaskId) => {
  const submitTask = await getSubmitTaskById(submittaskId);
  if (!submitTask) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SubmitTask not found');
  }

  const deleteSubmitTasks = await prisma.submitTask.deleteMany({
    where: {
      id: submittaskId
    },
  })

  return deleteSubmitTasks;
};

module.exports = {
  createSubmitTask,
  querySubmitTasks,
  getSubmitTaskById,
  updateSubmitTaskById,
  deleteSubmitTaskById,
};
