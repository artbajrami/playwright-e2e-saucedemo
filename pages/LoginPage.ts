import { type Page } from '@playwright/test';

/**
 * Page Object for Sauce Demo login page.
 * Encapsulates selectors and actions; assertions remain in specs.
 */
export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  get usernameInput() {
    return this.page.getByTestId('username');
  }

  get passwordInput() {
    return this.page.getByTestId('password');
  }

  get loginButton() {
    return this.page.getByTestId('login-button');
  }

  get errorMessage() {
    return this.page.getByRole('heading', { name: /epic sadface/i });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
