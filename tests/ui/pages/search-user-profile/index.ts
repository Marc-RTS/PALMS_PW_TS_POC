import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';
import AlertPopper from '../poppers/alert';
import SearchContainer from '../common/search-container';

export default class SearchUserProfilePage extends BasePage {
  readonly userProfileSearchPageHeader: Locator;
  readonly alertPopper: AlertPopper;
  readonly searchContainer: SearchContainer;

  constructor(page: Page) {
    super(page);
    this.userProfileSearchPageHeader = this.page.getByTestId('search-user-profile-page-header-title');
    this.searchContainer = new SearchContainer(this.page);
    this.alertPopper = new AlertPopper(this.page);
  }

  async init(): Promise<this> {
    return this;
  }
  async getAlertMessageContents() {
    return await this.alertPopper.getSnackbarMessage();
  }
  async getHeader() {
    return await this.userProfileSearchPageHeader.textContent();
  }
  async searchUserProfile(item: string): Promise<SearchContainer> {
    await this.searchContainer.fillSearchInput(item);
    await this.searchContainer.clickSearch();
    return new SearchContainer(this.page);
  }
}
