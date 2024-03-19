const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const checkSubmitTaskValidation = require('../../validations/checkSubmitTask.validation');
const checkSubmitTaskController = require('../../controllers/checkSubmitTask.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(checkSubmitTaskValidation.createcheckSubmitTask), checkSubmitTaskController.createcheckSubmitTask)
  .get(auth('getcheckSubmitTasks'), validate(checkSubmitTaskValidation.getcheckSubmitTasks), checkSubmitTaskController.getcheckSubmitTasks);

router
  .route('/:checkSubmitTaskId')
  .get(auth('getcheckSubmitTasks'), validate(checkSubmitTaskValidation.getcheckSubmitTask), checkSubmitTaskController.getcheckSubmitTask)
  .patch(auth('managecheckSubmitTasks'), validate(checkSubmitTaskValidation.updatecheckSubmitTask), checkSubmitTaskController.updatecheckSubmitTask)
  .delete(auth('managecheckSubmitTasks'), validate(checkSubmitTaskValidation.deletecheckSubmitTask), checkSubmitTaskController.deletecheckSubmitTask);

module.exports = router;