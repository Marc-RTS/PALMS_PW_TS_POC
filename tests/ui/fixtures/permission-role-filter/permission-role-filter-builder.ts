import { IPermissionRoleFilter } from '../interfaces';
import fxPermissionRoleFilter from './permission-role-filter.json';
import _ from 'lodash';

export default class PermissionRoleFilterBuilder {
  private permissionRoleFilter: IPermissionRoleFilter[];

  constructor() {
    this.permissionRoleFilter = _.cloneDeep(fxPermissionRoleFilter);
  }

  permissions(permissionKey: string) {
    this.permissionRoleFilter.forEach((element) => {
      element.permissions.filter((permission) => permission.key == `${permissionKey}`);
    });
    return this;
    // this.permissionRoleFilter.forEach((permission) => {
    //   permission.permissions.filter((key) => key.key == `${permissionKey}`);
    // });
  }
  domain(domain: string) {
    this.permissionRoleFilter.filter((dom) => dom.domain == domain);
    return this;
  }

  page(page: string) {
    this.permissionRoleFilter.filter((p) => p.page == page);
    return this;
  }
  //   setAssigned(roleNames: string[], roleTags: string[], isAssigned: boolean = true) {
  //     roleNames.forEach((roleName, index) => {
  //       const roleTag = roleTags[index];
  //       const permission = this.permission.userRoles.find((role) => role.roleName == `${roleName}` && role.roleTags == `${roleTag}`);
  //       permission!.isAssigned = isAssigned;
  //     });
  //     return this;
  //   }
  //   global(isGlobal: boolean) {
  //     this.permission.isGlobalAdmin = isGlobal;
  //     return this;
  //   }

  build() {
    return this.permissionRoleFilter;
  }
}
