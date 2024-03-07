import { IPermission } from '../interfaces';
import fxPermission from './permission.json';
import _, { forEach } from 'lodash';

export default class PermissionBuilder {
  private permission: IPermission;

  constructor() {
    this.permission = _.cloneDeep(fxPermission);
  }

  setAssigned(roleNames: string[], roleTags: string[], isAssigned: boolean = true) {
    // forEach(roleNames, (roleTags) => {
    //   const permission = this.permission.userRoles.find((role) => role.roleName == `${roleName}` && role.roleTags == `${roleTags}`);
    //   permission!.isAssigned = true;
    // });

    roleNames.forEach((roleName, index) => {
      const roleTag = roleTags[index];
      const permission = this.permission.userRoles.find((role) => role.roleName == `${roleName}` && role.roleTags == `${roleTag}`);
      permission!.isAssigned = isAssigned;
    });
    return this;
  }
  global(isGlobal: boolean) {
    this.permission.isGlobalAdmin = isGlobal;
    return this;
  }

  build() {
    return this.permission;
  }
}
