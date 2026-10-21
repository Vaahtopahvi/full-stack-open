import express from 'express'
// import mongoose from 'mongoose'
import Blog from './models/blog.js'

const app = express()
//middleware
app.use(express.json())

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

export default app
