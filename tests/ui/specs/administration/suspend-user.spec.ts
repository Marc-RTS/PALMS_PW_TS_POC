import { test, expect } from '../baset-test';

test.describe('Suspend User', () => {
  test.use({ storageState: 'tests/ui/utils/.auth/admin.json' });

  test.beforeEach(async ({ page, mock, administratorPortalPage }) => {
    page.goto('');
  });
});
