import PermissionRoleFilterBuilder from './permission-role-filter-builder';

export default class PermissionRoleFilter {
  generateGlobalPermissionRoleFilter() {
    const userPermissionRoleFilter = new PermissionRoleFilterBuilder().build();
    return userPermissionRoleFilter;
  }
  generateRegionalPermissionRoleFilter() {
    const userPermissionRoleFilter = new PermissionRoleFilterBuilder().permissions('Regional administrator').build();
    return userPermissionRoleFilter;
  }
  generatePermissionRoleFilterDomain(domain: string) {
    const userPermissionRoleFilter = new PermissionRoleFilterBuilder().domain(`${domain}`).build();
    return userPermissionRoleFilter;
  }
  generateRegionalPermissionRoleFilterPage(page: string) {
    const userPermissionRoleFilter = new PermissionRoleFilterBuilder().page(`${page}`).permissions('Regional administrator').build();
    return userPermissionRoleFilter;
  }
}
