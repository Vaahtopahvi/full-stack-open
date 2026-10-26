import { test, after } from 'node:test'
import mongoose from 'mongoose'
import assert from 'node:assert'
import listHelper from '../utils/list_helper.js'

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

after(async () => {
  await mongoose.connection.close()
})
