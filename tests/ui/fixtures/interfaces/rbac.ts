export default interface IRbac {
  hierarchyObjectsWithStatus: HierarchyObjectsWithStatus[];
  regions: string[];
}

export interface HierarchyObjectsWithStatus {
  hierarchyId: string;
  status: string;
  hierarchyName: string;
  pageName: string;
  objectType: string | null;
}
