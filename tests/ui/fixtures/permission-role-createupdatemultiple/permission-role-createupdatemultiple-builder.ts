import { IPermissionRoleCreateUpdateMultiple } from '../interfaces';
import fxPermissionRoleCreateUpdateMultiple from './permission-role-createupdatemultiple.json';
import _ from 'lodash';

export default class PermissionRoleCreateUpdateMultipleBuilder {
  private permissionCreateUpdateMultiple: IPermissionRoleCreateUpdateMultiple[];

  constructor() {
    this.permissionCreateUpdateMultiple = _.cloneDeep(fxPermissionRoleCreateUpdateMultiple);
  }

  build() {
    return this.permissionCreateUpdateMultiple;
  }
}
