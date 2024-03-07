import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';
import RouteListSidebar from '../sidebars/route-list';
import AdministratorPortalPage from '../administrator-portal';
import HomePage from '../home';
import ProfilePopper from '../poppers/profile';

export default class UserPortalPage extends BasePage {
  readonly routeListSidebar: RouteListSidebar;
  readonly appBarTitle: Locator;
  readonly pageHeader: Locator;
  readonly bannerPalms: Locator;
  readonly txtboxUserSapId: Locator;
  readonly btnSetUser: Locator;
  readonly btnMenuSideBar: Locator;
  readonly btnAvatar: Locator;
  readonly contentContainer: Locator;
  readonly logoPalms: Locator;
  readonly sideMenuSearchCustomerProfile: Locator;
  readonly profilePopper: Locator;

  constructor(page: Page) {
    super(page);
    this.routeListSidebar = new RouteListSidebar(this.page);
    this.appBarTitle = this.page.getByTestId('appbar-title');
    this.pageHeader = this.page.locator('h2');
    this.bannerPalms = this.page.getByRole('banner');
    this.txtboxUserSapId = this.page.getByTestId('home-set-current-user-input-inner');
    this.btnSetUser = this.page.getByTestId('home-set-current-user-button');
    this.btnMenuSideBar = this.page.getByTestId('appbar-open-sidebar');
    this.btnAvatar = this.page.getByTestId('appbar-avatar');
    this.contentContainer = this.page.locator('#content-container');
    this.logoPalms = this.page.getByRole('img', { name: 'palms logo' });
    this.sideMenuSearchCustomerProfile = this.page.getByTestId('sidebar-SearchCustomerProfile');
    this.profilePopper = this.page.getByTestId('appbar-profile-popper');
  }

  async init(): Promise<this> {
    return this;
  }

  async getTitle() {
    return await this.appBarTitle.innerText();
  }
  async clickSideBar() {
    await this.btnMenuSideBar.click();
    return new RouteListSidebar(this.page);
  }
  async clickAvatar() {
    await this.btnAvatar.click();
    return new ProfilePopper(this.page);
  }

  async navigateToAdminPortalPage() {
    let profilePopper = new ProfilePopper(this.page);
    if (!(await this.profilePopper.isVisible({ timeout: 2000 }))) {
      await this.clickAvatar();
    }

    if ((await profilePopper.switchView.textContent()) == 'Administration') {
      return await profilePopper.clickAdministration();
    }
    return new AdministratorPortalPage(this.page);
  }

  async NavigateToCustomerPortalPage() {
    // const profilePopper = await this.clickAvatar();
    let profilePopper = new ProfilePopper(this.page);
    if (!(await this.profilePopper.isVisible({ timeout: 2000 }))) {
      await this.clickAvatar();
    }
    if ((await profilePopper.switchView.textContent()) == 'Customer') {
      return await profilePopper.clickCustomer();
    }
    return new HomePage(this.page);
  }

  // Navigate to Sidebar menu
  async navigateToSearchUserProfilePage() {
    await this.navigateToAdminPortalPage();
    const sideBar = await this.clickSideBar();
    return await sideBar.clickSearchUserProfilePage();
  }

  async navigateToManageRolePermissionsPage() {
    await this.navigateToAdminPortalPage();
    const sideBar = await this.clickSideBar();
    return await sideBar.clickManageRolePermissionsPage();
  }
  async navigateToManageUserRolesPage() {
    await this.navigateToAdminPortalPage();
    const sideBar = await this.clickSideBar();
    return await sideBar.clickManageUserRolesPage();
  }
}
