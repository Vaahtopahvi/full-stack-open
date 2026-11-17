import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only author and title', async () => {
  const blog = {
    title: 'RIP Trump',
    author: 'Riku',
    url: 'https://example.com',
    likes: 5,
  }

  const { container } = render(<Blog blog={blog} />)

  // screen.debug(container)

  expect(container).toHaveTextContent('RIP Trump')
  expect(container).toHaveTextContent('Riku')
  expect(screen.queryByText(blog.url)).not.toBeInTheDocument()
  expect(screen.queryByText(`likes: ${blog.likes}`)).not.toBeInTheDocument()
  // expect(element, element2).toBeDefined()
})

test('clicking a button opens expanded details', async () => {
  const blog = {
    title: 'RIP Trump',
    author: 'Riku',
    url: 'https://example.com',
    likes: 5,
    user: { name: 'katori' },
  }

  // const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  // screen.debug()
  // console.log(container.textContent)

  expect(container).toHaveTextContent('RIP Trump')
  expect(container).toHaveTextContent(`likes: ${blog.likes}`)
  expect(container).toHaveTextContent('https://example.com')
  expect(container).toHaveTextContent(`added: ${blog.user.name}`)
})
