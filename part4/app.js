import express from 'express'
// import mongoose from 'mongoose'
import logger from './utils/logger.js'
import Blog from './models/blog.js'
import User from './models/user.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import jwt from 'jsonwebtoken'

const app = express()
//middleware
app.use(express.json())
app.use('/api/users/', usersRouter)
app.use('/api/login', loginRouter)

// get all blogs
app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', 'username name')
  response.json(blogs)
})

// let's extract token from authorization header
const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  // jos token alkaa Bearerilla niin korvataan Bearer tyhjällä ja saadaan bearer token...
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// add new blog
app.post('/api/blogs', async (request, response) => {
  // copy the fields from the submitted blog into this new object
  //ensin tehdään tämä

  // verify the token first
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  // find the user
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json()
  }

  // create the blog using user._id
  const blog = new Blog({ ...request.body, user: user._id })
  // console.log(blog)

  if (!blog.title || !blog.url) {
    return response.status(400).json()
  }

  // odotetaan blogin tallennusta
  const savedBlog = await blog.save()

  // liitetään uusi blogi sen luoneeseen käyttäjään
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  // lähetetään myöntävä vastaus takaisin + blogi
  response.status(201).json(savedBlog)
})

// delete a single blog by their id
app.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

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

// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler)

export default app
