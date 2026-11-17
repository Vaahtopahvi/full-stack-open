import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders author and title', async () => {
  const blog = {
    title: 'RIP Trump',
    author: 'Riku',
  }

  const { container } = render(<Blog blog={blog} />)

  screen.debug(container)

  expect(container).toHaveTextContent('RIP Trump')
  expect(container).toHaveTextContent('Riku')
  // expect(element, element2).toBeDefined()
})
