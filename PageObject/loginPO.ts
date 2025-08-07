import {Page,Locator} from '@playwright/test';

export class LoginPO
{
 page: Page;
 joinRealLink: Locator;

 constructor(page: Page)
 {
    this.page= page;
    this.joinRealLink= page.getByRole('link',{name:'Join Real'})
 }

 async NavigateToReal()
 {
    await this.page.goto('https://bolt.playrealbrokerage.com/');
 }

  async NavigateToRegister()
 {
    await this.joinRealLink.click();
 }
}