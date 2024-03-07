import { Page } from '@playwright/test';
import { IPermission, IRbac, IUser } from '../fixtures/interfaces';

export default class Mock {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getUser(fixture: any) {
    await this.routeFulfill('**/api/userprofile/user/current', fixture);
  }

  async getRBAC(palmsUserGuid: string, fixture: any) {
    await this.routeFulfill(`**/api/userprofile/rbac/${palmsUserGuid}`, fixture);
  }

  async getPermissionsUser(fixture: any) {
    await this.routeFulfill('**/api/userprofile/permission/user', fixture);
  }

  async getPermissionRoleFilter(fixture: any) {
    await this.routeFulfill('**/api/userprofile/permission/role/filter', fixture);
  }
  async getPredictiveSearch(fixture: any) {
    await this.routeFulfill('**/api/userprofile/user/predictivesearch', fixture);
  }

  async getUserFind(fixture: any) {
    await this.routeFulfill('**/api/userprofile/user/find', fixture);
  }
  async getPermissionRoleCreateUpdateMultiple(fixture: any) {
    await this.routeFulfill('**/api/userprofile/permission/role/createupdatemultiple', fixture);
  }

  async getUserResponses(user: IUser, rbac: IRbac, permission: IPermission) {
    await this.getUser(user);
    await this.getRBAC(user.palmsUserGuid, rbac);
    await this.getPermissionsUser(permission);
  }

  private async routeFulfill(url: string, fixture?: any, waitForeResponse = false) {
    await this.page.route(url, (route) => {
      route.fulfill({
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(fixture),
      });
    });
    if (waitForeResponse) await this.page.waitForResponse(url);
  }
}
