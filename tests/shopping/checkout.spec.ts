import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { users } from '../../test-data/users';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('full shopping flow: login, add to cart, checkout, order confirmation', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await checkoutPage.startCheckout();

    await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    await checkoutPage.continueToOverview();
    await checkoutPage.finishOrder();

    await expect(checkoutPage.orderCompleteHeading).toBeVisible();
  });

  test('required checkout fields validation', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await checkoutPage.startCheckout();

    await checkoutPage.continueButton.click();

    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });
});
