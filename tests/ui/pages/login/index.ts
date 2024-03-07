import { Page, Locator, chromium, expect } from '@playwright/test';
import BasePage from '../base.page';
import playwrightConfig from '../../../../playwright.config';
import dotenv from 'dotenv';
import fs from 'fs';
import { mkDirByPathSync } from '../../support/fileHelper';
import { IUser } from '../../fixtures/interfaces';
dotenv.config();

const baseUrl = playwrightConfig.use?.baseURL || 'http://localhost:8080';
const headless = playwrightConfig.use?.headless || 'true';

export default class LoginPage extends BasePage {
  // readonly page: Page;
  readonly btnSignIn: Locator;
  readonly txtboxSapId: Locator;
  readonly txtboxName: Locator;
  readonly txtboxEmail: Locator;

  constructor(page: Page) {
    super(page);
    // this.page = page;
    this.txtboxSapId = this.page.getByTestId('fake-auth-SAPID-input-field-inner');
    this.txtboxName = this.page.getByTestId('fake-auth-name-input-field-inner');
    this.txtboxEmail = this.page.getByTestId('fake-auth-email-input-field-inner');
    this.btnSignIn = this.page.getByTestId('fake-auth-submit');
  }

  async init(): Promise<this> {
    return this;
  }

  async clickLogin() {
    await this.btnSignIn.click();
  }

  async setSapId(sapId: string) {
    await this.txtboxSapId.fill(sapId);
  }

  async setEmail(email: string) {
    await this.txtboxEmail.fill(email);
  }

  async setName(palmsName: string) {
    await this.txtboxName.fill(palmsName);
  }

  async openLoginPage() {
    const browser = await chromium.launch({
      headless: headless === 'true',
    });

    const context = await browser.newContext({
      serviceWorkers: 'block',
    });

    const page = await context.newPage();
    await page.goto(baseUrl);
    return page;
  }

  async loginUser(sapId: string) {
    const page = await this.openLoginPage();
    const newPage = new LoginPage(page);
    await newPage.setSapId(sapId);
    await newPage.setName(`test_${sapId}`);
    await newPage.setEmail(`test_${sapId}@riotinto.com`);
    await newPage.clickLogin();
    await page.getByRole('dialog').waitFor({ state: 'hidden' });
    expect(await page.getByTestId('user-portal-page-header-title').isVisible()).toBeTruthy();

    return page;
  }

  async setSessionToken(page: Page, filePath: string, fileName: string) {
    const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));
    fs.writeFileSync(`${mkDirByPathSync(filePath)}/${fileName}.json`, JSON.stringify(sessionStorage));
  }

  async openPalms(page: Page, user: IUser) {
    const filePath = `tests/ui/utils/.auth`;
    const fileName = `${user.regionTags.replace(' ', '')}`;
    const file = `${filePath}/${fileName}.json`;

    const check = await this.checkToken(file);

    if (!check || check === undefined) {
      const page = await this.loginUser(user.sapPersonId.toString());
      await this.setSessionToken(page, filePath, fileName);
    }

    const sessionStorage = JSON.parse(fs.readFileSync(file, 'utf-8'));
    await page.context().addInitScript((storage: string) => {
      const entries = JSON.parse(storage);
      Object.keys(entries).forEach((key) => {
        window.sessionStorage.setItem(key, entries[key]);
      });
    }, sessionStorage);
    await page.goto('/');
  }

  async checkToken(file: string) {
    if (fs.existsSync(file)) {
      const payload = JSON.parse(fs.readFileSync(file, 'utf-8'));
      const idToken = Object.values(JSON.parse(payload))
        .map((value: any) => JSON.parse(value))
        .filter((token) => token.idToken);
      return idToken.length > 0 ? idToken[0] : null;
    }
  }
}
