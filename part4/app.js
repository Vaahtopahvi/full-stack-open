import express from 'express'
// import mongoose from 'mongoose'
import Blog from './models/blog.js'
import User from './models/user.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'

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

// add new blog
app.post('/api/blogs', async (request, response) => {
  // get the first user in db with no conditions ({})
  const user = await User.findOne({})
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  // console.log('tässä on user', user, ' ja tässä on user id', user._id)

  // copy the fields from the submitted blog into this new object
  // add user separately because client isn't choosing it
  const blog = new Blog({ ...request.body, user: user._id })
  // console.log(user)

  if (!blog.title || !blog.url) {
    response.status(400).json()
  } else {
    // odotetaan blogin tallennusta
    const savedBlog = await blog.save()

    // liitetään uusi blogi sen luoneeseen käyttäjään
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()

    // lähetetään myöntävä vastaus takaisin + blogi
    response.status(201).json(savedBlog)
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
