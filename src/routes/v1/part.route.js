const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const partValidation = require('../../validations/part.validation');
const partController = require('../../controllers/part.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('admin'), validate(partValidation.createPart), partController.createPart)
  .get(auth('admin'), validate(partValidation.getParts), partController.getParts);

router
  .route('/:partId')
  .get(auth('admin'), validate(partValidation.getPart), partController.getPart)
  .patch(auth('admin'), validate(partValidation.updatePart), partController.updatePart)
  .delete(auth('admin'), validate(partValidation.deletePart), partController.deletePart);

module.exports = router;