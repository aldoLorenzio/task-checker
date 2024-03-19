const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const submitTaskValidation = require('../../validations/submitTask.validation');
const submitTaskController = require('../../controllers/submitTask.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(submitTaskValidation.createsubmitTask), submitTaskController.createsubmitTask)
  .get(auth('getSubmitTasks'), validate(submitTaskValidation.getsubmitTasks), submitTaskController.getsubmitTasks);

router
  .route('/:submitTaskId')
  .get(auth('getSubmitTasks'), validate(submitTaskValidation.getsubmitTask), submitTaskController.getsubmitTask)
  .patch(auth('manageSubmitTasks'), validate(submitTaskValidation.updatesubmitTask), submitTaskController.updatesubmitTask)
  .delete(auth('manageSubmitTasks'), validate(submitTaskValidation.deletesubmitTask), submitTaskController.deletesubmitTask);

module.exports = router;