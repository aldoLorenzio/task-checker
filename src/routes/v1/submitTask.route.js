const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const submitTaskValidation = require('../../validations/submitTask.validation');
const submitTaskController = require('../../controllers/submitTask.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(submitTaskValidation.createsubmitTask), submitTaskController.createSubmitTask)
  .get(auth('getSubmitTasks'), validate(submitTaskValidation.getsubmitTasks), submitTaskController.getSubmitTasks);

router
  .route('/:submitTaskId')
  .get(auth('getSubmitTasks'), validate(submitTaskValidation.getsubmitTask), submitTaskController.getSubmitTask)
  .patch(auth('manageSubmitTasks'), validate(submitTaskValidation.updatesubmitTask), submitTaskController.updateSubmitTask)
  .delete(auth('manageSubmitTasks'), validate(submitTaskValidation.deletesubmitTask), submitTaskController.deleteSubmitTask);

module.exports = router;