const dummy = () => {
  return 1
}

const total = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.reduce(reducer, 0) / array.length
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    if (blog.likes > favorite.likes) {
      return blog
    }
    return favorite
  }, blogs[0])
}

export default { dummy, total, average, favoriteBlog }
