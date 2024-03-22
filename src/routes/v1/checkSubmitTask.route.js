const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const checkSubmitTaskValidation = require('../../validations/checkSubmitTask.validation');
const checkSubmitTaskController = require('../../controllers/checkSubmitTask.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('admin'),
    validate(checkSubmitTaskValidation.createCheckSubmitTask),
    checkSubmitTaskController.createCheckSubmitTask
  )
  .get(
    auth('admin'),
    validate(checkSubmitTaskValidation.getCheckSubmitTasks),
    checkSubmitTaskController.getCheckSubmitTasks
  );

router
  .route('/:checkSubmitTaskId')
  .get(auth('admin'), validate(checkSubmitTaskValidation.getCheckSubmitTask), checkSubmitTaskController.getCheckSubmitTask)
  .patch(
    auth('admin'),
    validate(checkSubmitTaskValidation.updateCheckSubmitTask),
    checkSubmitTaskController.updateCheckSubmitTask
  )
  .delete(
    auth('admin'),
    validate(checkSubmitTaskValidation.deleteCheckSubmitTask),
    checkSubmitTaskController.deleteCheckSubmitTask
  );

module.exports = router;
