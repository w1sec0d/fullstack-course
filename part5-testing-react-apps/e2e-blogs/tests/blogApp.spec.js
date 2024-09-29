const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginWith, createBlog} = require("./helper")

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset")
    await request.post("http://localhost:3001/api/users",{data: {
      name: "carlito",
      username:"carl",
      password:"Cisco123*"
    }})
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText("Log-in to application")
    await expect(locator).toBeVisible()
  })

  describe("login",() => {
    test("succeeds with correct credentials", async({page})=>{
        await loginWith(page,"carl","Cisco123*")

        const welcomeLabel = await page.getByText("Welcome carl Log Out")
        await expect(welcomeLabel).toBeVisible()
    })

    test("fails with incorrect credentials", async({page}) => {
        await loginWith(page,"carl","incorrect")

        await expect(page.getByText("Welcome")).not.toBeVisible()
        await expect(page.getByText("Log-in to application")).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page,"carl","Cisco123*")
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page,{name:"testBlog", author:"Carl", URL:"test.com"})
      await expect(page.getByText('testBlog')).toBeVisible();
    })

    test('A blog can be liked', async ({page}) => {
      await createBlog(page,{name:"testBlog", author:"Carl", URL:"test.com"})
      await page.getByRole('button', { name: 'View' }).click();
      await page.getByRole('button', { name: 'Like' }).click();
      await expect(page.getByTestId("likes_testBlog")).toHaveText("Likes: 1 Like")
    })
    
    test('A blog can be deleted', async({page}) => {
      await createBlog(page,{name:"testBlog", author:"Carl", URL:"test.com"})
      await page.getByRole('button', { name: 'View' }).click();
    })
  })
})