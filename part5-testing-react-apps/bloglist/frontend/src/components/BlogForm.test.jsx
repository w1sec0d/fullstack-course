import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, expect, test } from 'vitest'

import BlogForm from './BlogForm'

describe('New Blog Form',()=>{
  
  test('The form calls the handler with the right props',async()=>{
    const user = userEvent.setup()
    const createBlog = vi.fn()

    render(<BlogForm creationHandler={createBlog}/>)

    const submitButton = screen.getByText("Save")
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0]).toHaveLength(3)
  })
})