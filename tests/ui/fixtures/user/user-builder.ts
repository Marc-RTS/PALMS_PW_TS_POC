import { IUser } from '../interfaces';
import fxUser from './user.json';
import _ from 'lodash';

export default class UserBuilder {
  private user: IUser;

  constructor() {
    this.user = _.cloneDeep(fxUser);
  }

  regionTags(regionTags: string) {
    this.user.regionTags = regionTags;
    return this;
  }

  build() {
    return this.user;
  }
}
