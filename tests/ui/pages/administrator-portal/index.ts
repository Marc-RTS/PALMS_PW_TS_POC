import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';
import RouteListSidebar from '../sidebars';

export default class AdministratorPortalPage extends BasePage {
  readonly routeListSidebar: RouteListSidebar;
  readonly administratorPortalHeader: Locator;
  readonly administratorPortalTitle: Locator;
  readonly selectorRegion: Locator;
  readonly optionCanIronOre: Locator;
  readonly optionAusIronOre: Locator;
  readonly optionGlobal: Locator;
  readonly arrowDropdownIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.routeListSidebar = new RouteListSidebar(this.page);
    this.administratorPortalHeader = this.page.getByRole('heading');
    this.administratorPortalTitle = this.page.getByTestId('appbar-title');
    this.selectorRegion = this.page.getByTestId('appbar-region');
    this.optionCanIronOre = this.page.getByTestId('appbar-region-select-regCANpgIRO');
    this.optionAusIronOre = this.page.getByTestId('appbar-region-select-regAUSpgIRO');
    this.optionGlobal = this.page.getByTestId('appbar-region-select-regGLOBAL');
    this.arrowDropdownIcon = this.page.getByTestId('ArrowDropDownIcon');
  }

  async init(): Promise<this> {
    return this;
  }

  async getTitle() {
    return await this.administratorPortalTitle.textContent();
  }
  async isRegionSelectorVisible() {
    return await this.selectorRegion.isVisible();
  }
  async getOptionAusIronOre() {
    return await this.optionAusIronOre.textContent();
  }
  async getOptionCanIronOre() {
    return await this.optionCanIronOre.textContent();
  }
  async getOptionGlobal() {
    return await this.optionGlobal.textContent();
  }
  async clickRegionSelector() {
    await this.selectorRegion.click();
  }

  async clickArrowDropDownIcon() {
    await this.arrowDropdownIcon.click();
  }

  async selectAusIronOreRegion() {
    await this.optionAusIronOre.click();
  }

  async selectCanIronOreRegion() {
    await this.optionCanIronOre.click();
  }

  async selectGlobalRegion() {
    await this.optionGlobal.click();
  }

  async switchToAusIronOreRegion() {
    await this.clickRegionSelector();
    await this.selectAusIronOreRegion();
  }

  async switchToCanIronOreRegion() {
    await this.clickRegionSelector();
    await this.selectCanIronOreRegion();
  }

  async switchToGlobalRegion() {
    await this.clickRegionSelector();
    await this.selectGlobalRegion();
  }
}
