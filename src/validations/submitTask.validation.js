const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createsubmitTask = {
  body: Joi.object().keys({
    subjectId: Joi.string().required().custom(objectId),
    answer: Joi.string().required(),
    result: Joi.boolean(),
    userId: Joi.string().required().custom(objectId),
  }),
};

const getsubmitTasks = {
  query: Joi.object().keys({
    submitTaskName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getsubmitTask = {
  params: Joi.object().keys({
    submitTaskId: Joi.string().custom(objectId),
  }),
};

const updatesubmitTask = {
  params: Joi.object().keys({
    submitTaskId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      subjectId: Joi.string().custom(objectId),
      answer: Joi.string(),
      result: Joi.boolean(),
      userId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deletesubmitTask = {
  params: Joi.object().keys({
    submitTaskId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createsubmitTask,
  getsubmitTasks,
  getsubmitTask,
  updatesubmitTask,
  deletesubmitTask,
};
