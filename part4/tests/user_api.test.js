import { test, beforeEach, describe, after } from 'node:test'
import mongoose from 'mongoose'
import assert from 'node:assert'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import supertest from 'supertest'
import app from '../app.js'
import helper from '../utils/list_helper.js'

const api = supertest(app)

describe('when there is intially one user at db', () => {
  beforeEach(async () => {
    //listan tyhjennys
    await User.deleteMany({})
    // console.log('Cleared!')

    //uuden käyttäjän luonti databaseen
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'rikuvaa',
      name: 'Riku Väätänen',
      password: 'salainen',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  })
})
after(async () => {
  await mongoose.connection.close()
})
