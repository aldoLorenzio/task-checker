const httpStatus = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

const createPart = async (partBody) => {
  return prisma.part.create({
    data: partBody,
  });
};

const queryParts = async (filter, options) => {
  const { part } = filter;
  const { sortBy, take, skip } = options;
  const parts = await prisma.part.findMany({
    where: {
      partName: {
        contains: part,
      },
    },
    include: {
      subjects: true,
    },
    take: take && parseInt(take),
    skip: skip && parseInt(skip),
    orderBy: {
      partName: 'asc',
    },
  });
  return parts;
};

const getPartById = async (id) => {
  return prisma.part.findFirst({
    where: {
      id,
    },
    include: {
      subjects: true,
    },
  });
};

const updatePartById = async (partId, updateBody) => {
  const part = await getPartById(partId);
  if (!part) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Part not found');
  }

  const updatePart = await prisma.part.update({
    where: {
      id: partId,
    },
    data: updateBody,
  });

  return updatePart;
};

const deletePartById = async (partId) => {
  const part = await getPartById(partId);
  if (!part) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Part not found');
  }

  const deleteParts = await prisma.part.deleteMany({
    where: {
      id: partId,
    },
  });

  return deleteParts;
};

module.exports = {
  createPart,
  queryParts,
  getPartById,
  updatePartById,
  deletePartById,
};
