import dotenv from 'dotenv'
dotenv.config()
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

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
