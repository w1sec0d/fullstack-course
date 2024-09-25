const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require("./helper")

describe('note app', ()=>{
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'Salainen0'
      }
    })
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {  
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
  
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'Salainen0')
  
    await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'Salainen0')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright')
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note', true)
        await createNote(page, 'second note', true)
        await createNote(page, 'third note', true)
      })
  
      test('importance can be changed', async ({ page }) => {
        await page.pause()
        const otherNoteText = await page.getByText('second note')
        const otherdNoteElement = await otherNoteText.locator('..')
    
        await otherdNoteElement.getByRole('button', { name: 'make not important' }).click()
        
        await expect(otherdNoteElement.getByText('make important')).toBeVisible()
      })
    })

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note', true)
        await createNote(page, 'second note', true)
      })

      test('one of those can be made nonimportant', async ({ page }) => {
        const button = await page.locator('li').filter({ hasText: 'second notemake not important' }).getByRole('button')
        await expect(button).toBeVisible({ timeout: 10000 }) // Ensure the button is visible
        await button.click({ timeout: 10000 }) // Increase the timeout for the click action

        await expect(page.locator('li').filter({ hasText: 'second notemake important' }).getByRole('button')).toBeVisible()
      })  
    })
  }) 

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'wrongPass')

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
  }) 
})