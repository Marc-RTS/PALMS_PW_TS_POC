import { Locator, Page } from '@playwright/test';
import BasePage from '../../base.page';
import SearchUserProfilePage from '../../search-user-profile';
import ManageUserRolesPage from '../../manage-user-roles';
import ManageRolePermissionPage from '../../manage-role-permission';
import ManageRolesPage from '../../manage-roles';

export default class RouteListSidebar extends BasePage {
  readonly searchUserProfile: Locator;
  readonly manageUserRoles: Locator;
  readonly manageRoles: Locator;
  readonly manageRolePermissions: Locator;
  readonly manageReferenceDataa: Locator;
  readonly viewUserHistory: Locator;
  readonly searchCustomerProfile: Locator;
  readonly tapLanding: Locator;
  readonly tapRequestQueue: Locator;
  readonly administration: Locator;

  constructor(page: Page) {
    super(page);
    this.searchUserProfile = this.page.getByTestId('sidebar-SearchUserProfile');
    this.manageUserRoles = this.page.getByTestId('sidebar-ManageUserRoles');
    this.manageRoles = this.page.getByTestId('sidebar-ManageRoles');
    this.manageRolePermissions = this.page.getByTestId('sidebar-ManageRolePermissions');
    this.manageReferenceDataa = this.page.getByTestId('sidebar-ManageReferenceData');
    this.viewUserHistory = this.page.getByTestId('sidebar-ViewUserHistory');
    this.searchCustomerProfile = this.page.getByTestId('sidebar-SearchCustomerProfile');
    this.tapLanding = this.page.getByTestId('sidebar-TapLanding');
    this.tapRequestQueue = this.page.getByTestId('sidebar-TapRequestQueue');
    this.administration = this.page.getByTestId('sidebar-Administration');
  }

  async init(): Promise<this> {
    return this;
  }
  async clickAdministration() {
    await this.administration.click();
  }
  async clickSearchUserProfilePage(): Promise<SearchUserProfilePage> {
    await this.clickAdministration();
    await this.searchUserProfile.click();
    return new SearchUserProfilePage(this.page);
  }
  async clickManageUserRolesPage(): Promise<ManageUserRolesPage> {
    await this.clickAdministration();
    await this.manageUserRoles.click();
    return new ManageUserRolesPage(this.page);
  }

  async clickManageRolePermissionsPage(): Promise<ManageRolePermissionPage> {
    await this.clickAdministration();
    await this.manageRolePermissions.click();
    return new ManageRolePermissionPage(this.page);
  }

  async clickManageRolesPage(): Promise<ManageRolesPage> {
    await this.clickAdministration();
    await this.manageRoles.click();
    return new ManageRolesPage(this.page);
  }

  async isSideMenuManageRolesHidden() {
    return await this.manageRoles.isHidden();
  }
}
