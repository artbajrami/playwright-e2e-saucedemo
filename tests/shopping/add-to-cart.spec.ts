import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { users } from '../../test-data/users';

test.describe('Add to Cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('sorting products works correctly (A to Z)', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.selectSortOption('az');
    const firstAfterAz = await productsPage.getFirstProductName();

    await productsPage.selectSortOption('za');
    const firstAfterZa = await productsPage.getFirstProductName();

    expect(firstAfterAz).not.toBe(firstAfterZa);
  });

  test('cart persists during navigation', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();

    await page.getByTestId('continue-shopping').click();
    await expect(productsPage.title).toBeVisible();

    await productsPage.goToCart();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  });
});
