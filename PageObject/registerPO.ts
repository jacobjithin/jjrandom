import { Page, Locator } from '@playwright/test';

export class RegisterPO {
  page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly username: Locator;
  readonly email: Locator;
  readonly country: Locator;
  readonly countryOption: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly terms: Locator;
  readonly permission: Locator;
  readonly createAccount: Locator;
  readonly optionText: string;
  readonly errorElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByRole('textbox', { name: 'First Name' });
    this.lastName = page.getByRole('textbox', { name: 'Last Name' });
    this.username = page.getByRole('textbox', { name: 'Username' });
    this.email = page.getByRole('textbox', { name: 'Email' });
    this.country = page.getByRole('textbox', { name: 'Country' });
    this.password = page.getByTestId('password');
    this.confirmPassword = page.getByTestId('confirmPassword');
    this.terms = page.getByRole('checkbox', { name: 'terms' });
    this.permission = page.getByRole('checkbox', { name: 'permission' });
    this.createAccount = page.getByRole('button', { name: 'Create Account' });
    this.errorElement = page.locator('.mantine-TextInput-error');
  }
  async UserInfo(first: string, last: string, country: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.country.click();
    await this.page.getByRole('option', { name: country }).click();
  }

  async UserInfo1(first: string, last: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
  }

  async Credentials(user: string, emailId: string, pwd: string) {
    await this.username.fill(user);
    await this.email.fill(emailId);
    await this.password.fill(pwd);
    await this.confirmPassword.fill(pwd);
  }

  async TermsAndPermissionsCheck() {
    await this.terms.check();
    await this.permission.check();
    await this.createAccount.click();
  }

  async CreateClick() {
    await this.createAccount.click();
  }

  async GetErrorMessage(): Promise<string[]> {
    const errorElement = this.errorElement;
    await errorElement.first().waitFor({ state: 'visible' });
    const errorText = await this.errorElement.allTextContents();
    return errorText;
  }
}
