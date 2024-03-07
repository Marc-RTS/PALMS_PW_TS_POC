import { test as setup } from '../specs/baset-test';
import { BOTH_CAN_AND_AUS_REGIONALADMIN, GLOBAL_ADMIN } from '../support/constants';
import fs from 'fs';

const globalAdmin = 'tests/ui/utils/.auth/global_admin.json';
const bothAusAndCanAdmin = 'tests/ui/utils/.auth/both_aus_can_admin.json';

setup('authenticate as global admin', async ({ loginPage }) => {
  const page = await loginPage.loginUser(GLOBAL_ADMIN);
  const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));
  fs.writeFileSync(globalAdmin, JSON.stringify(sessionStorage), 'utf-8');
  await page.close();
});

setup('authenticate as both AUS and CAN admin', async ({ loginPage }) => {
  const page = await loginPage.loginUser(BOTH_CAN_AND_AUS_REGIONALADMIN);
  const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));
  fs.writeFileSync(bothAusAndCanAdmin, JSON.stringify(sessionStorage), 'utf-8');
  await page.close();
});
