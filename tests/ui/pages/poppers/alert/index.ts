import { Locator, Page } from '@playwright/test';
import BasePage from '../../base.page';

export default class AlertPopper extends BasePage {
  readonly snackbar: Locator;
  readonly alertSnackbarIcon: Locator;
  readonly alertSnackbarMessage: Locator;
  constructor(page: Page) {
    super(page);
    this.snackbar = this.page.getByTestId('snackbar');
    this.alertSnackbarIcon = this.snackbar.locator('.MuiAlert-icon');
    this.alertSnackbarMessage = this.snackbar.locator('.MuiAlert-message');
  }

  async init(): Promise<this> {
    return this;
  }
  async getSnackbarMessage() {
    return this.alertSnackbarMessage.textContent();
  }

  async isSuccessIconVisible() {
    return this.snackbar.getByTestId('SuccessOutlinedIcon').isVisible();
  }
}
