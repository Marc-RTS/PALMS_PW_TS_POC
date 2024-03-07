import { Page, Locator } from '@playwright/test';
import BasePage from '../../base.page';
import ProfileSideBar from '../../sidebars/profile';
import ViewUserHistoryPage from '../../view-user-history';
import ManageUserRolesPage from '../../manage-user-roles';

export default class SearchContainer extends BasePage {
  // readonly page: Page;
  readonly txtboxSearch: Locator;
  readonly btnSearch: Locator;
  readonly listSearchResult: Locator;
  readonly btnCreateCustomerProfile: Locator;
  readonly chkboxPalmsOnly: Locator;
  constructor(page: Page) {
    super(page);
    // this.page = page;
    this.txtboxSearch = page.getByTestId('fuzzy-search-input-base').getByRole('combobox');
    this.btnSearch = page.getByTestId('search-fuzzy-search-text-button');
    this.listSearchResult = page.getByRole('listitem');
    this.btnCreateCustomerProfile = page.getByTestId('search-create-customer-profile-button');
    this.chkboxPalmsOnly = page.locator('Mui-checked');
  }

  async init(): Promise<this> {
    return this;
  }
  async getListSearchResult(sapId: string) {
    return await this.page.getByTestId(`search-results-${sapId}-result-item`).textContent();
  }
  async isCreateCustomerProfileButtonHidden() {
    return await this.btnCreateCustomerProfile.isHidden();
  }
  async isPalmsOnlyCheckboxHidden() {
    return await this.chkboxPalmsOnly.isHidden();
  }
  async clickSearch(): Promise<SearchContainer> {
    await this.btnSearch.click();
    return new SearchContainer(this.page);
  }
  async fillSearchInput(item: string) {
    await this.txtboxSearch.fill(item);
  }
  async clickSearchResultActionButton(sapUserId: string) {
    await this.page.getByTestId(`search-results-${sapUserId}-action-button`).click();
  }
  async navigateToManageUserRolePage(sapUserId: string): Promise<ManageUserRolesPage> {
    await this.clickSearchResultActionButton(sapUserId);
    await this.page.getByTestId(`search-results-${sapUserId}-manage-user-roles-menu-item`).click();
    return new ManageUserRolesPage(this.page);
  }

  async navigateToViewUserHistoryPage(sapUserId: string): Promise<ViewUserHistoryPage> {
    await this.clickSearchResultActionButton(sapUserId);
    await this.page.getByTestId(`search-results-${sapUserId}-view-user-history-menu-item`).click();
    return new ViewUserHistoryPage(this.page);
  }
  async clickSearchResultItemButton(sapUserId: string): Promise<ProfileSideBar> {
    await this.page.getByTestId(`search-results-${sapUserId}-result-item-button`).click();
    return new ProfileSideBar(this.page);
  }
}
