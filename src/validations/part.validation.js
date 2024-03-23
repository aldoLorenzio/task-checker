const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPart = {
  body: Joi.object().keys({
    partName: Joi.string().required(),
  }),
};

const getParts = {
  query: Joi.object().keys({
    partName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPart = {
  params: Joi.object().keys({
    partId: Joi.string().custom(objectId),
  }),
};

const updatePart = {
  params: Joi.object().keys({
    partId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      partName: Joi.string().required(),
    })
    .min(1),
};

const deletePart = {
  params: Joi.object().keys({
    partId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPart,
  getParts,
  getPart,
  updatePart,
  deletePart,
};
