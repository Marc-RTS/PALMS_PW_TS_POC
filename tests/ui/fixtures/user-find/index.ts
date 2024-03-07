import { IResult } from '../interfaces/user-find';
import UserFindBuilder from './user-find-builder';

export default class UserFind {
  generateDefaultUserFind() {
    const userFind = new UserFindBuilder().build();
    return userFind;
  }
  generateUserFindNoProfileFound() {
    const userFind = new UserFindBuilder().noResult().dataAggregatedFrom(1).errorMessage(null).count(0).build();
    return userFind;
  }
}
