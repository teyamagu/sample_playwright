import { Locator, Page } from "@playwright/test";

export class AnaIndex {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly usernamePlaceholder: Locator;
  readonly passwordPlaceholder: Locator;
  readonly modalLoginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('link', { name: 'ログイン' });
    this.usernamePlaceholder = page.getByPlaceholder('例）1234567890');
    this.passwordPlaceholder = page.getByPlaceholder('例）Abc123456');
    this.modalLoginButton = page.getByRole('link', { name: 'ログイン', exact: true });
  }

  async load() {
    await this.page.goto("https://www.ana.co.jp/");
    await this.page.waitForURL(this.page.url());
  }

  async login(username:string, password:string) {
    await this.page.goto('https://www.ana.co.jp/');
    await this.loginButton.click();
    await this.usernamePlaceholder.fill(username);
    await this.passwordPlaceholder.fill(password);
    // ログイン時にmodalが表示され、2回ログインボタンを押す必要がある
    await this.modalLoginButton.click();
    await this.modalLoginButton.click();
  }

}
