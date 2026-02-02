import { type Page } from '@playwright/test';

/**
 * Page Object for Sauce Demo cart and checkout flow.
 * Encapsulates selectors and actions; assertions remain in specs.
 */
export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get checkoutButton() {
    return this.page.getByTestId('checkout');
  }

  get continueShoppingButton() {
    return this.page.getByTestId('continue-shopping');
  }

  get firstNameInput() {
    return this.page.getByTestId('firstName');
  }

  get lastNameInput() {
    return this.page.getByTestId('lastName');
  }

  get postalCodeInput() {
    return this.page.getByTestId('postalCode');
  }

  get continueButton() {
    return this.page.getByTestId('continue');
  }

  get finishButton() {
    return this.page.getByTestId('finish');
  }

  get orderCompleteHeading() {
    return this.page.getByRole('heading', { name: /thank you for your order/i });
  }

  get errorMessage() {
    return this.page.getByRole('heading', { name: /error/i });
  }

  async startCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async completeCheckout(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.startCheckout();
    await this.fillShippingInfo(firstName, lastName, postalCode);
    await this.continueToOverview();
    await this.finishOrder();
  }
}
