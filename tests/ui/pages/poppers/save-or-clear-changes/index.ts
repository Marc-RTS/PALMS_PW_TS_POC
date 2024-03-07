import { Locator, Page } from '@playwright/test';
import BasePage from '../../base.page';

export default class SaveOrCancelChangesPopper extends BasePage {
  readonly saveOrCancelChangesHeader: Locator;
  readonly saveOrCancelChangesContent: Locator;
  readonly btnCancel: Locator;
  readonly btnClearChanges: Locator;
  readonly btnSaveChanges: Locator;

  constructor(page: Page) {
    super(page);
    this.saveOrCancelChangesHeader = this.page.locator('.MuiDialogTitle-root');
    this.saveOrCancelChangesContent = this.page.locator('.MuiDialogContent-root');
    this.btnCancel = this.page.locator('.MuiDialogActions-root').getByText('Cancel');
    this.btnClearChanges = this.page.locator('.MuiDialogActions-root').getByText('Clear changes');
    this.btnSaveChanges = this.page.locator('.MuiDialogActions-root').getByText('Save changes');
  }

  async init(): Promise<this> {
    return this;
  }
  async clickCancel() {
    await this.btnCancel.click();
  }

  async clickClearChanges() {
    await this.btnClearChanges.click();
  }

  async clickSaveChanges() {
    await this.btnSaveChanges.click();
  }
}
