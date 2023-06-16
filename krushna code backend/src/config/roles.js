const roles = ['user', 'admin','superAdmin'];
const adminRoles = ['superAdmin']; //only this roles can login to dashboard

const roleRights = new Map();
roleRights.set(roles[1], ['getUsers', "manageUsers"]);
roleRights.set(roles[2], ['getUsers', 'adminAccess','manageUsers']

  );

module.exports = {
  roles,
  roleRights,
  adminRoles,

};
