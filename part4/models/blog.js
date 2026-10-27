// import { ServerMonitoringMode } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import config from '../utils/config.js'

// console.log('connecting to mongoDB')
mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    // console.log('connection established!')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

//try await catch homma
//   try {
//   await mongoose.connect(config.MONGODB_URI, { family: 4 })
// } catch (error) {
//   console.error('Error connecting to MongoDB:', error.message)
//   throw error
// }

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
