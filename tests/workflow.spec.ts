import { test, expect } from '@playwright/test';
import { LoginPO } from '../PageObject/loginPO';
import { RegisterPO } from '../PageObject/registerPO';
import { inputData } from '../Data/inputData';

test.describe('All Workflow Tests', () => {
  test('Navigate to Register1', async ({ page }) => {
    const loginPO = new LoginPO(page);
    await loginPO.NavigateToReal();
    await expect(page).toHaveURL(/.login/);
    await page.waitForURL(/.login/);
    await loginPO.NavigateToRegister();
    await page.waitForURL(/.*register/);
  });
  //     test.beforeEach( async({page})=>{
  //  const loginPO = new LoginPO(page)
  //         await loginPO.NavigateToReal();
  //         await expect(page).toHaveURL(/.login/);
  //         await page.waitForURL(/.login/);
  //         await loginPO.NavigateToRegister();
  //         await page.waitForURL(/.register/);
  //     })
  test('[@regression]Register', async ({ page }) => {
    const loginPO = new LoginPO(page);
    await loginPO.NavigateToReal();
    await expect(page).toHaveURL(/.login/);
    await page.waitForURL(/.login/);
    await loginPO.NavigateToRegister();
    await page.waitForURL(/.register/);
    const register = new RegisterPO(page);
    await register.UserInfo(
      inputData.firstName,
      inputData.lastName,
      inputData.country,
    );
    await register.Credentials(
      inputData.userName,
      inputData.Email,
      inputData.Password,
    );
    await register.TermsAndPermissionsCheck();
    //await page.waitForURL(/.onboarding/);
  });

  test('@smokeError Get', async ({ page }) => {
    const loginPO = new LoginPO(page);
    await loginPO.NavigateToReal();
    await expect(page).toHaveURL(/.login/);
    await page.waitForURL(/.login/);
    await loginPO.NavigateToRegister();
    await page.waitForURL(/.register/);
    await page.getByRole('button', { name: 'Create Account' }).click();
    const register = new RegisterPO(page);
    const errors = await register.GetErrorMessage();
    console.log(errors);
    expect(errors).toContain('First name is required');
    //await page.waitForURL(/.onboarding/);
  });

  test('[@Smoke] First Name Validation', async ({ page }) => {
    page.goto('https://bolt.playrealbrokerage.com/register');
    const register = new RegisterPO(page);
    // await page.pause();
    await page.getByRole('textbox', { name: 'First Name' }).fill('');
    register.firstName.fill('');
    register.firstName.press('Tab');
    //   const firstNameError= await page.locator('.mantine-TextInput-error',{hasText:'First name'}).textContent();
    //   console.log(firstNameError);
    //   expect(firstNameError).toBe('First name is required');

    await expect(page.getByText('First name is required')).toBeVisible();
  });

  test('[@smoke] Password Validation', async ({ page }) => {
    await page.goto('https://bolt.playrealbrokerage.com/register');
    const register = new RegisterPO(page);
    await page.pause();
    await register.password.fill('Jithin1234567!');
    // await expect(register.password).toHaveAttribute('type' ,'password');
    // await register.password.locator('..').locator(('[data-testid="password-input-toggle"]')).click();
    // await register.password.locator('+ div').click();
    //await siblingElment.click();
    await register.password
      .locator('..')
      .locator('.password-input-toggle')
      .click({ timeout: 5000 });
    await expect(register.password).toHaveAttribute('type', 'text');
  });
});
