import { test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'
import helper from '../utils/list_helper.js'

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared!')

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
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  // console.log('nyt tulee response body ', response.body)

  const contents = response.body.map((r) => r.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  assert(contents.includes('Type shi'))
})

test('change like count to zero, if no likes are provided', async () => {
  const newBlog = {
    title: 'Jinpings Dynastia',
    author: 'Hoo Lee Sheet',
    url: 'https://redarmy.cn',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  // console.log(response.body)
  const addedBlog = response.body.find((blog) => blog.title === newBlog.title)
  console.log(addedBlog)
  assert.deepStrictEqual(addedBlog.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})
