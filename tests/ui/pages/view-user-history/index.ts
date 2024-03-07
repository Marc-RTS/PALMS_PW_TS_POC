import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';

export default class ViewUserHistoryPage extends BasePage {
  readonly viewUserHistoryPageHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.viewUserHistoryPageHeader = this.page.getByTestId('view-user-history-page-title-header-title');
  }

  async init(): Promise<this> {
    return this;
  }
  async getHeader() {
    return await this.viewUserHistoryPageHeader.textContent();
  }
}
