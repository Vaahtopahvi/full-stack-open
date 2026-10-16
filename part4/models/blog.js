// import { ServerMonitoringMode } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import config from '../utils/config.js'

console.log('connecting to mongoDB')
mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    console.log('connection established!')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
