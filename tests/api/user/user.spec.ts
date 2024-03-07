import test, { expect } from '@playwright/test';

test('should get user', async ({ request }) => {
  const user = await request.get(`https://palms-be-temp-dev.azurewebsites.net/api/userprofile/user/current`, {
    data: {
      body: '',
    },
  });
  expect(user.ok()).toBeTruthy();
});
