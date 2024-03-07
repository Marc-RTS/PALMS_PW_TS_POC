export default interface ICreateUpdateMultiple {
  hierarchyId: string;
  objectTypeId: null;
  domain: string;
  page: string;
  attributeName: null;
  attributeType: string;
  permissions: Permission[];
}

export interface Permission {
  key: string;
  value: string;
}
