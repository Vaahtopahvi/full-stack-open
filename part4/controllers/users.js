import bcrypt from 'bcrypt'
import express from 'express'
const usersRouter = express.Router()
import User from '../models/user.js'

// palauta kaikki käyttäjät
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

// uuden käyttäjän lisäys
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  //   console.log('tässä tulee request body', request.body)

  if (typeof username !== 'string' || username.length < 3) {
    return response
      .status(400)
      .json({ error: 'username must be at least 3 characters' })
  }
  if (typeof password !== 'string' || password.length < 3) {
    return response
      .status(400)
      .json({ error: 'password must be at least 3 characters' })
  }

  // salasanan hashays
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    return response.status(201).json(savedUser)
  } catch (error) {
    if (
      error.name === 'MongoServerError' &&
      error.message.includes('E11000 duplicate key error')
    ) {
      return response
        .status(400)
        .json({ error: 'expected `username` to be unique' })
    }
    throw error
  }
})

export default usersRouter
