const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

const createSubject = async (subjectBody) => {
  return prisma.subject.create({
    data: subjectBody,
  });
};

const querySubjects = async (filter, options) => {
  const { subject } = filter;
  const { take, skip } = options;
  const subjects = await prisma.subject.findMany({
    where: {
      title: {
        contains: subject,
      },
    },
    take: take && parseInt(take),
    skip: skip && parseInt(skip),
  });
  return subjects;
};

const getSubjectById = async (id) => {
  return prisma.subject.findFirst({
    where: {
      id,
    },
  });
};

const updateSubjectById = async (subjectId, updateBody) => {
  const subject = await getSubjectById(subjectId);
  if (!subject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
  }

  const updateSubject = await prisma.subject.update({
    where: {
      id: subjectId,
    },
    data: updateBody,
  });

  return updateSubject;
};

const deleteSubjectById = async (subjectId) => {
  const subject = await getSubjectById(subjectId);
  if (!subject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
  }

  const deleteSubjects = await prisma.subject.deleteMany({
    where: {
      id: subjectId,
    },
  });

  return deleteSubjects;
};

module.exports = {
  createSubject,
  querySubjects,
  getSubjectById,
  updateSubjectById,
  deleteSubjectById,
};
