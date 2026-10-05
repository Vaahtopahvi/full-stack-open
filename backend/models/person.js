import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

// tässä näkyy osoite ja osoitteessa on salasana
console.log('connecting to mongodb URI')
mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    // joko validate: syntaksilla tai sit näin
    match: [
      /^(?=.{8,})\d{2,3}[-]\d{7,8}$/,
      'Phone number must start with 2-3 digits, a hyphen and end with 7 or 8 digits',
    ],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model('Person', personSchema)

export default Person
