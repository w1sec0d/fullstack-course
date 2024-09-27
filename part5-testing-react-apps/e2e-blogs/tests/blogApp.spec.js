const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginWith} = require("./helper")

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
})