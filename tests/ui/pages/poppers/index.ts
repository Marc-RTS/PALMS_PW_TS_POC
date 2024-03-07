import { Page } from '@playwright/test';
import BasePage from '../base.page';
import ProfilePopper from './profile';
import BasePopper from './base';
import AlertPopper from './alert';
import SaveOrCancelChangesPopper from './save-or-clear-changes';

export default class Poppers extends BasePage {
  readonly profilePopper: ProfilePopper;
  readonly basePopper: BasePopper;
  readonly alertPopper: AlertPopper;
  readonly saveOrCancelPopper: SaveOrCancelChangesPopper;

  constructor(page: Page) {
    super(page);
    this.profilePopper = new ProfilePopper(this.page);
    this.basePopper = new BasePopper(this.page);
    this.alertPopper = new AlertPopper(this.page);
    this.saveOrCancelPopper = new SaveOrCancelChangesPopper(this.page);
  }

  async init(): Promise<this> {
    return this;
  }
}
