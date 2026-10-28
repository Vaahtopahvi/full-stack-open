import express from 'express'
// import mongoose from 'mongoose'
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
  try {
    // verify the token first
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    // find the user
    const user = await User.findById(decodedToken.id)
    // create the blog using user._id
    const blog = new Blog({ ...request.body, user: user._id })
    console.log(blog)

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
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      console.log(error.message)
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    throw error
  }
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

export default app
