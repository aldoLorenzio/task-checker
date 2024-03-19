const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const checkSubmitTaskValidation = require('../../validations/checkSubmitTask.validation');
const checkSubmitTaskController = require('../../controllers/checkSubmitTask.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(checkSubmitTaskValidation.createCheckSubmitTask), checkSubmitTaskController.createCheckSubmitTask)
  .get(auth('getcheckSubmitTasks'), validate(checkSubmitTaskValidation.getCheckSubmitTasks), checkSubmitTaskController.getCheckSubmitTasks);

router
  .route('/:checkSubmitTaskId')
  .get(auth('getcheckSubmitTasks'), validate(checkSubmitTaskValidation.getCheckSubmitTask), checkSubmitTaskController.getCheckSubmitTask)
  .patch(auth('managecheckSubmitTasks'), validate(checkSubmitTaskValidation.updateCheckSubmitTask), checkSubmitTaskController.updateCheckSubmitTask)
  .delete(auth('managecheckSubmitTasks'), validate(checkSubmitTaskValidation.deleteCheckSubmitTask), checkSubmitTaskController.deleteCheckSubmitTask);

module.exports = router;