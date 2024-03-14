import { Locator, Page } from '@playwright/test';
import BasePage from '../../base.page';
import AdministratorPortalPage from '../../administrator-portal';
import UserPortalPage from '../../user-portal';

export default class ProfilePopper extends BasePage {
  readonly avatar: Locator;
  readonly name: Locator;
  readonly email: Locator;
  readonly viewAccount: Locator;
  readonly switchView: Locator;
  readonly signOut: Locator;
  readonly organisationalUnit: Locator;

  constructor(page: Page) {
    super(page);
    this.avatar = page.getByTestId('appbar-profile-popper-avatar');
    this.name = page.getByTestId('appbar-profile-popper-name');
    this.email = page.getByTestId('appbar-profile-popper-business-email');
    this.viewAccount = page.getByTestId('appbar-profile-popper-view-account');
    this.switchView = page.getByTestId('appbar-profile-popper-switch-view');
    this.signOut = page.getByTestId('appbar-profile-popper-sign-out');
    this.organisationalUnit = page.getByTestId('appbar-profile-popper-organisational-unit');
  }

  async init(): Promise<this> {
    return this;
  }
  async clickAdministration(): Promise<AdministratorPortalPage> {
    await this.switchView.click();
    return new AdministratorPortalPage(this.page);
  }
  async clickCustomer(): Promise<UserPortalPage> {
    await this.switchView.click();
    return new UserPortalPage(this.page);
  }
  async clickSignOut() {
    await this.signOut.click();
  }
  async isSwitchViewHidden() {
    return await this.switchView.isHidden();
  }
  async isNameVisiable(fullname: string) {
    return await this.page.getByRole('heading', { name: `${fullname}` }).isVisible();
  }
}
