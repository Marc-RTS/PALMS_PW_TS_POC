import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';
import RouteListSidebar from '../sidebars';

export default class ManageUserRolesPage extends BasePage {
  readonly RouteListSidebar: RouteListSidebar;
  readonly manageUserRolesPageHeader: Locator;
  constructor(page: Page) {
    super(page);
    this.RouteListSidebar = new RouteListSidebar(this.page);
    this.manageUserRolesPageHeader = this.page.getByTestId('manage-user-roles-page-header-title');
  }

  async init(): Promise<this> {
    return this;
  }

  async getHeader() {
    return this.manageUserRolesPageHeader.textContent();
  }
}
