import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';
import SearchContainer from './search-container';

export default class Common extends BasePage {
  readonly searchContainer: SearchContainer;
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.searchContainer = new SearchContainer(this.page);
  }

  async init(): Promise<this> {
    return this;
  }
}
