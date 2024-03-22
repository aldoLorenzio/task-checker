const allRoles = {
  user: [],
  admin: [
    'getUsers',
    'manageUsers',
    'getPart',
    'getSubjects',
    'getSubmitTasks',
    'getCheckSubmitTasks'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
