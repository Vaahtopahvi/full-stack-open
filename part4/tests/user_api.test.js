import { test, beforeEach, describe, after } from 'node:test'
import mongoose from 'mongoose'
import assert from 'node:assert'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import supertest from 'supertest'
import app from '../app.js'
import helper from '../utils/list_helper.js'

const api = supertest(app)

describe('when there is intially one user in db', () => {
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

  test('creation fails with missing username', async () => {
    const usersAtStart = await helper.usersInDb()

    const noName = {
      name: 'rikuli väätänen',
      password: 'salainen',
    }
    const response = await api
      .post('/api/users')
      .send(noName)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    // console.log(response.body)
    assert.strictEqual(typeof response.body.error, 'string')
    assert.ok(response.body.error.length > 0)
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with too short username', async () => {
    const usersAtStart = await helper.usersInDb()

    const shortName = {
      username: 'ri',
      name: 'rikuli väätänen',
      password: 'salainen',
    }
    const response = await api
      .post('/api/users')
      .send(shortName)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    // console.log(response.body)
    assert.strictEqual(typeof response.body.error, 'string')
    assert.ok(response.body.error.length > 0)
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with missing password', async () => {
    const usersAtStart = await helper.usersInDb()

    const noPassword = {
      username: 'rikku',
      name: 'rikuli väätänen',
    }
    const response = await api
      .post('/api/users')
      .send(noPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    // console.log(response.body)
    assert.strictEqual(typeof response.body.error, 'string')
    assert.ok(response.body.error.length > 0)
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with too short password', async () => {
    const usersAtStart = await helper.usersInDb()

    const shortPassword = {
      username: 'rikku',
      name: 'rikuli väätänen',
      password: '44',
    }
    const response = await api
      .post('/api/users')
      .send(shortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    // console.log(response.body)
    assert.strictEqual(typeof response.body.error, 'string')
    assert.ok(response.body.error.length > 0)
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    // console.log('tässä on listan kaverit', usersAtStart)

    const newUser = {
      username: 'root',
      name: 'katri väätänen',
      password: 'salsa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})
after(async () => {
  await mongoose.connection.close()
})
