import { type Page } from '@playwright/test';

/**
 * Page Object for Sauce Demo products/inventory page.
 * Encapsulates selectors and actions; assertions remain in specs.
 */
export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get title() {
    return this.page.getByText('Products');
  }

  get cartLink() {
    return this.page.getByTestId('shopping-cart-link');
  }

  get sortDropdown() {
    return this.page.locator('select.product_sort_container');
  }

  get inventoryList() {
    return this.page.getByTestId('inventory-list');
  }

  get inventoryItems() {
    return this.page.getByTestId('inventory-item');
  }

  addToCartButton(productName: string) {
    const item = this.page.getByTestId('inventory-item').filter({ hasText: productName });
    return item.getByRole('button', { name: /add to cart/i });
  }

  removeFromCartButton(productName: string) {
    const item = this.page.getByTestId('inventory-item').filter({ hasText: productName });
    return item.getByRole('button', { name: /remove/i });
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.addToCartButton(productName).click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async selectSortOption(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  getFirstProductName(): Promise<string> {
    return this.inventoryItems.first().getByTestId('inventory-item-name').textContent() ?? Promise.resolve('');
  }
}
