import { IRbac } from '../interfaces';
import fxRbac from './rbac.json';
import _ from 'lodash';

export default class RbacBuilder {
  private rbac: IRbac;

  constructor() {
    this.rbac = _.cloneDeep(fxRbac);
  }

  regionTags(regions: string[]) {
    this.rbac.regions = regions;
    return this;
  }

  build() {
    return this.rbac;
  }
}
