import express from 'express'
// import mongoose from 'mongoose'
import Blog from './models/blog.js'
import usersRouter from './controllers/users.js'

const app = express()
//middleware
app.use(express.json())
app.use('/api/users/', usersRouter)

// get all blogs
app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

// add new blog
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    response.status(400).json()
  } else {
    blog.save().then((result) => {
      response.status(201).json(result)
    })
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
