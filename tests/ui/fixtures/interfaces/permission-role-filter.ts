import PermissionKeys from './permissions-keys';

export default interface IPermissionRoleFilter {
  hierarchyId: string;
  objectTypeId: null;
  domain: string;
  page: null | string;
  attributeName: null | string;
  attributeType: string;
  permissions: PermissionKeys[];
}
