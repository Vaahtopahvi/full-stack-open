import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders only author and title', async () => {
  const blog = {
    title: 'RIP Trump',
    author: 'Riku',
    url: 'https://example.com',
    likes: 5,
  }

  const { container } = render(<Blog blog={blog} />)

  screen.debug(container)

  expect(container).toHaveTextContent('RIP Trump')
  expect(container).toHaveTextContent('Riku')
  expect(screen.queryByText(blog.url)).not.toBeInTheDocument()
  expect(screen.queryByText(`likes: ${blog.likes}`)).not.toBeInTheDocument()
  // expect(element, element2).toBeDefined()
})
