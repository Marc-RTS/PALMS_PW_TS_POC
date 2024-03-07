import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';

export default class QueueManagementPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async init(): Promise<this> {
    return this;
  }
}
