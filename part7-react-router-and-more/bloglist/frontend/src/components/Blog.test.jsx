import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi, beforeEach } from 'vitest'

import Blog from './Blog'

describe('Blog Component', () => {
  let container

  beforeEach(() => {
    const testBlog = {
      title: 'A test blog',
      author: 'tester',
      url: 'test.com',
      likes: 25,
    }
    container = render(<Blog value={testBlog} />).container
  })

  test('Renders content', () => {
    const testDiv = container.querySelector('.blog')
    expect(testDiv).toBeDefined()
  })

  test('Displays only title and author by default', () => {
    const testDiv = container.querySelector('.blog')
    expect(testDiv).toHaveTextContent('A test blog')
    expect(testDiv).toHaveTextContent('tester')
    expect(testDiv).not.toHaveTextContent('test.com')
    expect(testDiv).not.toHaveTextContent('25')
  })

  test('Displays url and likes when button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const testDiv = container.querySelector('.blog')
    expect(testDiv).toHaveTextContent('test.com')
    expect(testDiv).toHaveTextContent('25')
  })

  test('When like button is clicked twice, event handler is called twice', async () => {
    document.body.innerHTML = ''
    const likeFunction = vi.fn()
    const testBlog = {
      title: 'A test blog',
      author: 'tester',
      url: 'test.com',
      likes: 25,
    }
    container = render(
      <Blog handleLike={likeFunction} value={testBlog} />
    ).container

    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeFunction.mock.calls).toHaveLength(2)
  })
})
