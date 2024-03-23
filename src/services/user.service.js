const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  userBody.password = bcrypt.hashSync(userBody.password, 8);

  return prisma.user.create({
    data: userBody,
  });
};

/**
 * Query for users
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const { user } = filter;
  const { take, skip } = options;
  const users = await prisma.user.findMany({
    where:{
      name:{
        contains: user
      },
    },
    take: take && parseInt(take),
    skip: skip && parseInt(skip),
  });
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return prisma.user.findFirst({
    where: {
      id,
    },
  });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateBody,
  });

  return updateUser;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const deleteUsers = await prisma.user.deleteMany({
    where: {
      id: userId,
    },
  });

  return deleteUsers;
};

const querySubmitTask = async (userId) => {
  const submitTask = await prisma.user.findMany({
    where:{id: userId},
    include:{submitTask: true}
  })

  return submitTask
}


module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  querySubmitTask
};
