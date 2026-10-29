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

export default tokenExtractor
