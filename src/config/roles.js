const allRoles = {
  user: ['manageUsers', 'manageSubmitTask'],
  admin: [
    'admin',
    'manageUsers',
    'manageSubmitTask'],
};

const roles = Object.keys(allRoles);
const roleRights= new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
