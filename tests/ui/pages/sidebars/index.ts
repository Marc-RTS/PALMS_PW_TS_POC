import { Page } from '@playwright/test';
import BasePage from '../base.page';
import RouteListSidebar from './route-list';
import SearchFilterSideBar from './search-filter';
import ProfileSideBar from './profile';

export default class Sidebars extends BasePage {
  readonly routeListSidebar: RouteListSidebar;
  readonly searchFilter: SearchFilterSideBar;
  readonly profile: ProfileSideBar;

  constructor(page: Page) {
    super(page);
    this.routeListSidebar = new RouteListSidebar(this.page);
  }

  async init(): Promise<this> {
    return this;
  }
}
