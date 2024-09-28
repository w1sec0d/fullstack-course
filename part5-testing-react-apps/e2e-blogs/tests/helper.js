const loginWith = async(page,username,password) => {
  await page.getByLabel("Username").fill(username)
  await page.getByLabel("Password").fill(password)
  await page.getByRole("button", {name:"Log In"}).click()
}

const createBlog = async(page, blog) =>{
  await page.getByRole('button', { name: 'New Blog' }).click();
  await page.getByLabel('Title').fill(blog.name);
  await page.getByLabel('Author').fill(blog.author);
  await page.getByLabel('Url').fill(blog.URL);
  await page.getByRole('button', { name: 'Save' }).click();
}

export {loginWith, createBlog}