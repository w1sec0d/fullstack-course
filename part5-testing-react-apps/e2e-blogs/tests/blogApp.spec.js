const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");
const { before } = require("node:test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "carlito",
        username: "carl",
        password: "Cisco123*",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = await page.getByText("Log-in to application");
    await expect(locator).toBeVisible();
  });

  describe("login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "carl", "Cisco123*");

      const welcomeLabel = await page.getByText("Welcome carl Log Out");
      await expect(welcomeLabel).toBeVisible();
    });

    test("fails with incorrect credentials", async ({ page }) => {
      await loginWith(page, "carl", "incorrect");

      await expect(page.getByText("Welcome")).not.toBeVisible();
      await expect(page.getByText("Log-in to application")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "carl", "Cisco123*");
    });

    test("A new blog can be created", async ({ page }) => {
      await createBlog(page, {
        name: "testBlog",
        author: "Carl",
        URL: "test.com",
      });
      await expect(page.getByText("testBlog")).toBeVisible();
    });

    test("Blogs are sorted by likes", async ({ page }) => {
      await createBlog(page, {
        name: "No likes blog",
        author: "Carl",
        URL: "test.com",
      });
      await createBlog(page, {
        name: "5 likes blog",
        author: "Carl",
        URL: "test.com",
      });

      await page
        .locator("div")
        .filter({ hasText: /^5 likes blogCarlView$/ })
        .getByRole("button")
        .click();
      await page.getByRole("button", { name: "Like" }).click();
      await page.getByRole("button", { name: "Like" }).click();
      await page.getByRole("button", { name: "Like" }).click();
      await page.getByRole("button", { name: "Like" }).click();
      await page.getByRole("button", { name: "Like" }).click();

      await createBlog(page, {
        name: "2 likes blog",
        author: "Carl",
        URL: "test.com",
      });
      
      await page
        .locator("div")
        .filter({ hasText: /^2 likes blogCarlView$/ })
        .getByRole("button")
        .click();
      await page
        .getByTestId("likes_2 likes blog")
        .getByRole("button", { name: "Like" })
        .click();
      await page
        .getByTestId("likes_2 likes blog")
        .getByRole("button", { name: "Like" })
        .click();

      await page.goto("http://localhost:5173/");

      const firstBlog = await page.locator("div.blog").first();
      await expect(firstBlog).toHaveText("5 likes blogCarlView");

      const secondBlog = await page.locator("div.blog").nth(1);
      await expect(secondBlog).toHaveText("2 likes blogCarlView");

      const thirdBlog = await page.locator("div.blog").last();
      await expect(thirdBlog).toHaveText("No likes blogCarlView");
    });

    describe("And a blog is created", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          name: "testBlog",
          author: "Carl",
          URL: "test.com",
        });
      });

      test("A blog can be liked", async ({ page }) => {
        await page.getByRole("button", { name: "View" }).click();
        await page.getByRole("button", { name: "Like" }).click();
        await expect(page.getByTestId("likes_testBlog")).toHaveText(
          "Likes: 1 Like"
        );
      });

      test("A blog can be deleted", async ({ page }) => {
        await page.getByRole("button", { name: "View" }).click();
        await page.getByRole("button", { name: "Remove" }).click();
        await page.getByRole("button", { name: "Yes, delete it!" }).click();
        await page.getByRole("button", { name: "OK" }).click();
        await expect(page.getByText("testBlog")).not.toBeVisible();
      });

      test("Only the author can see the delete button", async ({
        page,
        request,
      }) => {
        // Checks the current author sees the remove button
        await page.getByRole("button", { name: "View" }).click();
        await expect(
          page.getByRole("button", { name: "Remove" })
        ).toBeVisible();
        await page.getByRole("button", { name: "Log Out" }).click();

        // Creates new user
        await request.post("http://localhost:3001/api/users", {
          data: {
            name: "hanna",
            username: "hanna",
            password: "Cisco123*",
          },
        });

        // Checks that new user does not see remove button
        await page.getByLabel("Username").fill("hanna");
        await page.getByLabel("Password").fill("Cisco123*");
        await page.getByRole("button", { name: "Log In" }).click();
        await page.getByRole("button", { name: "View" }).click();
        await expect(
          page.getByRole("button", { name: "Remove" })
        ).not.toBeVisible();
      });
    });

    
  });
});
