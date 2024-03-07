import UserFind from '.';
import { IUserFind } from '../interfaces';
import { IResult } from '../interfaces/user-find';
import fxUserFind from './user-find.json';
import _, { forEach } from 'lodash';

export default class UserFindBuilder {
  private userFind: IUserFind;
  private results: Array<IResult> = [];

  constructor() {
    this.userFind = _.cloneDeep(fxUserFind);
  }

  result(result: IResult) {
    this.userFind.results.push(result);
    return this;
  }

  noResult() {
    this.userFind.results = [];
    return this;
  }

  count(count: number) {
    this.userFind.count = count;
    return this;
  }
  dataAggregatedFrom(data: number) {
    this.userFind.dataAggregatedFrom = data;
    return this;
  }
  errorMessage(msg: any) {
    this.userFind.errorMessage = msg;
    return this;
  }
  build() {
    return this.userFind;
  }
}
