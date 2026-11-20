import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calls createBlog with the correct data', async () => {
  const user = userEvent.setup()
  const blog = {
    title: 'RIP Trump',
    author: 'Riku',
    url: 'https://example.com',
  }
  const createBlog = vi.fn().mockResolvedValue(blog)

  render(<BlogForm createBlog={createBlog} />)

  // await hommat kaikille input fieldeille
  await user.type(screen.getByLabelText('title:'), blog.title)
  await user.type(screen.getByLabelText('author:'), blog.author)
  await user.type(screen.getByLabelText('url:'), blog.url)
  // ja sit käyttäjä klikkaa create nappia
  await user.click(screen.getByText('create'))

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual(blog)
})
