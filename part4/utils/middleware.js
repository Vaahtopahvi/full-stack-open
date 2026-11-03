import jwt from 'jsonwebtoken'
import User from '../models/user.js'

// let's extract token from authorization header
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  // jos token alkaa Bearerilla niin korvataan Bearer tyhjällä ja saadaan bearer token...
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  // Verify the token and read the user ID saved in its payload.
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // console.log('decoded token', decodedToken)

  // käyttäjän haku tietokannasta ja request olioon liittäminen. kutsutaan next vain jos löydetään käyttäjä
  if (decodedToken.id) {
    // Look up that user and attach the database record for the route handler.
    request.user = await User.findById(decodedToken.id)
    if (!request.user) {
      //jos ei oo nii lähetetään statuskoodi 401
      return response
        .status(401)
        .json({ error: 'no user found with matching id' })
    }
    // Continue to the route handler with request.user available.
    next()
  } else {
    request.token = null
    return response.status(401).json({
      error:
        'missing token, invalid token, a token with no ID, or a token for a deleted user',
    })
  }
}

export default { tokenExtractor, userExtractor }
