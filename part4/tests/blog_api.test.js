import { test, after, beforeEach, describe } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'
import User from '../models/user.js'
import helper from '../utils/list_helper.js'
import bcrypt from 'bcrypt'

const api = supertest(app)
let token

beforeEach(async () => {
  await User.deleteMany({})
  const saltRounds = 10
  // hashataan salasana ja tallennetaan se muuttujaan
  const passwordHash = await bcrypt.hash('password', saltRounds)
  // luodaan testikäyttäjä testi credentiaaleilla
  await new User({ username: 'user1', passwordHash }).save()
  // const user = await User.findOne({ username })

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'user1', password: 'password' })
    .expect(200)

  token = loginResponse.body.token

  await Blog.deleteMany({})
  // console.log('cleared!')

  // luodaan muuttuja, johon tallennetaan helper taulukossa olevia JS-olioita vastaavat
  // Blog konstruktorifunktiolla generoidut mongoose oliot.
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))

  // luodaan uusi taulukko, joka muodostuu promiseista, jotka saadaan kun jokaiselle
  // blogObjects taulukon alkioille kutsutaan metodia save
  const promiseArray = blogObjects.map((blog) => blog.save())

  // Metodin Promise.all avulla saadaan koostettua taulukollinen promiseja yhdeksi promiseksi
  // joka valmistuu, eli menee tilaan fulfilled kun kaikki sen parametrina olevan taulukon promiset
  // ovat valmistuneet ✅
  await Promise.all(promiseArray)
  // let blogObject = new Blog(helper.initialBlogs[0])
  // await blogObject.save()
  // blogObject = new Blog(helper.initialBlogs[1])
  // await blogObject.save()
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, 6)
  console.log('testing id')
  assert.ok(response.body[0].id)
  assert.strictEqual(response.body[0]._id, undefined)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  // console.log('testi', response.body)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Type shi',
    author: 'Riku Vöx',
    url: 'https://google.fi',
    likes: 67,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  // console.log('nyt tulee response body ', response.body)

  const contents = response.body.map((r) => r.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  assert(contents.includes('Type shi'))
})

test('a valid blog can not be added without a token', async () => {
  const newBlog = {
    title: 'OSRS is a good game',
    author: 'Jagex',
    url: 'https://oldschool.runescape.com',
    likes: 1,
  }
  await api.post('/api/blogs').send(newBlog).expect(401)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('change like count to zero, if no likes are provided', async () => {
  const newBlog = {
    title: 'Jinpings Dynastia',
    author: 'Hoo Lee Sheet',
    url: 'https://redarmy.cn',
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  // console.log(response.body)
  const addedBlog = response.body.find((blog) => blog.title === newBlog.title)
  // console.log(addedBlog)
  assert.deepStrictEqual(addedBlog.likes, 0)
})

test('send error 400 if blog has no title', async () => {
  const newBlog = {
    author: 'Hoo Lee Sheet',
    url: 'https://redarmy.cn',
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('send error 400 if blog has no url', async () => {
  const newBlog = {
    title: 'Jinpings Dynastia',
    author: 'Hoo Lee Sheet',
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const newBlog = {
      title: 'Blog to delete',
      author: 'Test user',
      url: 'https://example.com',
    }

    const createResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogToDelete = createResponse.body

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    // blogit poiston jälkeen
    const blogsAtEnd = await helper.blogsInDb()
    // console.log(blogsAtEnd)

    const ids = blogsAtEnd.map((n) => n.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

test('succeeds with status code 200 if update is success', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToEdit = blogsAtStart[0]
  // console.log(blogToEdit)
  const expectedLikes = blogToEdit.likes + 1
  // console.log(expectedLikes)

  await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ likes: expectedLikes })
    .expect(200)

  //blogit muokkauksen jälkeen
  const blogsAtEnd = await helper.blogsInDb()
  const editedBlog = blogsAtEnd.find((blog) => blog.id === blogToEdit.id)
  // console.log('tässä on edited blog', blogToEdit)
  // console.log('very important update: made a clog function again :D')
  // assert.equal(editedBlog.body.likes, expectedLikes)
  assert.deepStrictEqual(editedBlog.likes, expectedLikes)
})

after(async () => {
  await mongoose.connection.close()
})
