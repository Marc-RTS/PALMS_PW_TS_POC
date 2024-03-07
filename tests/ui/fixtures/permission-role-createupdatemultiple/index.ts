import PermissionRoleCreateUpdateMultipleBuilder from './permission-role-createupdatemultiple-builder';

export default class PermissionRoleCreateUpdateMultiple {
  generatePermissionRoleCreateUpdateMultiple() {
    const permissionRoleCUM = new PermissionRoleCreateUpdateMultipleBuilder().build();
    return permissionRoleCUM;
  }
}
