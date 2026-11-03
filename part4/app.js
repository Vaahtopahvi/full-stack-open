import express from 'express'
// import mongoose from 'mongoose'
import logger from './utils/logger.js'
import Blog from './models/blog.js'
// import User from './models/user.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
// import jwt from 'jsonwebtoken'
import middleware from './utils/middleware.js'

const app = express()
//middleware
app.use(express.json())
// let's use token and user extractor only in 'api/blogs' post and delete
// Extract the Bearer token once so later middleware and routes can read request.token.
app.use(middleware.tokenExtractor)
app.use('/api/users/', usersRouter)
app.use('/api/login', loginRouter)

// get all blogs
app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', 'username name')
  response.json(blogs)
})

// add new blog
// userExtractor runs before this handler and provides the authenticated user as request.user.
app.post('/api/blogs', middleware.userExtractor, async (request, response) => {
  // userExtractor has already verified the credential and attached the matching user.
  const user = request.user

  // Use the authenticated user's ID, not an owner ID supplied by the request body.
  const blog = new Blog({ ...request.body, user: user._id })
  // console.log(blog)

  if (!blog.title || !blog.url) {
    return response.status(400).json()
  }

  // odotetaan blogin tallennusta
  const savedBlog = await blog.save()

  // Keep the user's list of blogs in sync with the blog's user field.
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  // lähetetään myöntävä vastaus takaisin + blogi
  response.status(201).json(savedBlog)
})

// delete a single blog by their id
app.delete(
  '/api/blogs/:id',
  // Attach the authenticated user before checking who owns the requested blog.
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user

    const fetchedBlog = await Blog.findById(request.params.id)
    if (!fetchedBlog) {
      return response.status(404).json({ error: 'no blog found' })
    }
    // Convert the database ObjectId to a string before comparing it with the user's ID.
    if (fetchedBlog.user.toString() !== user.id.toString()) {
      return response.status(403).json({ error: 'user ID mismatch' })
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  },
)

// update a single blog by their id
app.put('/api/blogs/:id', async (request, response) => {
  // console.log(request.body)
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
  )
  response.status(200).json(updatedBlog)
})

// error handle middleware
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  // Convert known database and token errors into appropriate HTTP responses.
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    })
  }

  next(error)
}

// register error handling last so it can process errors from the routes above.
app.use(errorHandler)

export default app
