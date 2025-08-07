import { test, expect } from '@playwright/test';

test('Create Account', async ({ page }) => {
  await page.goto('https://bolt.playrealbrokerage.com/');
  await page.getByRole('link', { name: 'Join Real' }).click();
  expect(page).toHaveURL(/.*register/);
  await page.getByLabel('First Name').fill('Jithin');
  await page.getByLabel('Last Name').fill('Jacob');
  await page.getByLabel('Username').fill('jithinj56');
  await page.getByTestId('emailAddress').fill('jithin.jacb5@gmail.com');
  await page.getByLabel('Country').click();
  await page.getByText('United States').click();
  await page.getByTestId('password').fill('Jithin12345!');
  await page.getByTestId('confirmPassword').fill('Jithin12345!');
  await page.getByRole('checkbox', { name: 'terms' }).check();
  await page.getByRole('checkbox', { name: 'permission' }).check();
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.getByAltText('Real Logo')).toBeVisible();
});
