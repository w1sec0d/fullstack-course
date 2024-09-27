const loginWith = async(page,username,password) => {
  await page.getByLabel("Username").fill(username)
  await page.getByLabel("Password").fill(password)
  await page.getByRole("button", {name:"Log In"}).click()
}

export {loginWith}