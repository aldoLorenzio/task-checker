const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCheckSubmitTask = {
  body: Joi.object().keys({
    submitTaskId: Joi.string().required().custom(objectId),
    result: Joi.boolean(),
    comment: Joi.string().required(),
  }),
};

const getCheckSubmitTasks = {
  query: Joi.object().keys({
    submitTaskId: Joi.string().required().custom(objectId),
    result: Joi.boolean(),
    comment: Joi.string().required(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCheckSubmitTask = {
  params: Joi.object().keys({
    checkSubmitTaskId: Joi.string().custom(objectId),
  }),
};

const updateCheckSubmitTask = {
  params: Joi.object().keys({
    checkSubmitTaskId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      submitTaskId: Joi.string().required().custom(objectId),
      result: Joi.boolean(),
      comment: Joi.string().required(),
    })
    .min(1),
};

const deleteCheckSubmitTask = {
  params: Joi.object().keys({
    checkSubmitTaskId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCheckSubmitTask,
  getCheckSubmitTasks,
  getCheckSubmitTask,
  updateCheckSubmitTask,
  deleteCheckSubmitTask,
};
