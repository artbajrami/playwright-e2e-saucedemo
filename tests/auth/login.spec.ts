import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { users, invalidCredentials } from '../../test-data/users';

test.describe('Authentication', () => {
  test('successful login with standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(productsPage.title).toBeVisible();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('login fails with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(invalidCredentials.username, invalidCredentials.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});
