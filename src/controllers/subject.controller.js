const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { subjectService } = require('../services');

const createSubject = catchAsync(async (req, res) => {
  const subject = await subjectService.createSubject(req.body);

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Create Subject Success',
    data: subject,
  });
});

const getSubjects = catchAsync(async (req, res) => {
  const filter = { subject: req.query.subject };
  const options = {
    sortBy: req.query.sortBy,
    take: req.query.take,
    skip: req.query.skip,
  };

  const result = await subjectService.querySubjects(filter, options);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Subjects Success',
    data: result,
  });
});

const getSubject = catchAsync(async (req, res) => {
  const subject = await subjectService.getSubjectById(req.params.subjectId);
  if (!subject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
  }

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get Subject Success',
    data: subject,
  });
});

const updateSubject = catchAsync(async (req, res) => {
  const subject = await subjectService.updateSubjectById(req.params.subjectId, req.body);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Update Subject Success',
    data: subject,
  });
});

const deleteSubject = catchAsync(async (req, res) => {
  await subjectService.deleteSubjectById(req.params.subjectId);

  res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Delete Subject Success',
    data: null,
  });
});

module.exports = {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
};
