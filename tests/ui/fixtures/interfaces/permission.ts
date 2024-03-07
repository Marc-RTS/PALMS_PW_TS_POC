export default interface IPermission {
  numberOfAdminRoles: NumberOfAdminRole[];
  userRoles: UserRole[];
  isGlobalAdmin: boolean;
}

export interface NumberOfAdminRole {
  roleId: string;
  count: number;
}

export interface UserRole {
  userRoleId: null | string;
  roleId: string;
  sortOrder: number;
  roleName: string;
  roleDescription: null | string;
  roleTags: string;
  isRoleDefault: boolean;
  isRoleAdmin: boolean;
  isAssigned: boolean;
}
