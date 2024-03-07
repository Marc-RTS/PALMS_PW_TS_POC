export default interface IUserFind {
  results: IResult[];
  count: number;
  dataAggregatedFrom: number;
  errorMessage: null;
}

export interface IResult {
  sourceSystem: number;
  rank: number;
  levenshteinDistance: number;
  palmsUserGuid: string;
  hrInfoRequired: boolean;
  validated: boolean;
  palmsRole: string[];
  palmsStatus: string;
  firstName: string;
  lastName: string;
  middleName: null | string;
  preferredName: string;
  position: string;
  personnelSubArea: string;
  sapPersonnelNumber: number;
  sapPersonId: number;
  dayOfBirth: string;
  dateOfBirth: string;
  businessPhoneNumber: null | string;
  personalPhoneNumber: string | null;
  qantasFrequentFlyerNumber: string | null;
  virginFrequentFlyerNumber: string | null;
  leader: string;
  leaderId: null | number;
  leaderRole: null | string;
  leaderRoleId: number;
  contractorRepresentative: null | string;
  contractorRepresentativeId: null | string;
  contractorRepresentativeRole: string;
  contractorRepresentativeRoleId: null;
  organisationalUnit: string;
  organisationalUnitId: number;
  personnelArea: string;
  personnelAreaId: string;
  businessUnit: null | string;
  businessUnitId: null;
  employer: string;
  employerId: string;
  costCentre: string;
  costCentreId: string;
  workSchedule: null | string;
  workScheduleId: null | string;
  employmentClass: string;
  reservation: string | null;
  homePort: string;
  originPort: string | null;
  workPort: string | null;
  palmsCostCode: string | null;
  palmsCostCodeId: null;
}
