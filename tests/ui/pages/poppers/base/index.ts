import { Locator, Page } from '@playwright/test';
import BasePage from '../../base.page';

export default class BasePopper extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async init(): Promise<this> {
    return this;
  }
}
