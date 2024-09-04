const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const result = blogs.reduce(
    (prev, current) => {
      return current.likes > prev.likes ? current : prev
    },
    { likes: -Infinity }
  )
  console.log(result)
  return { title: result.title, author: result.author, likes: result.likes }
}

const mostBlogs = (blogs) => {
  if (!blogs){
    return null
  }

  const authorList = [...new Set(blogs.map((blog) => blog.author))] // Creates unique author array

  const blogsPerAuthor = []

  // Iterates each author to count how many blogs has each of them
  authorList.forEach(
    (author) => {
      let count = blogs.reduce(
        (total,blog) => {
          return blog.author === author ? total + 1 : total
        }
        , 0
      )
      blogsPerAuthor.push({ author, blogs: count })
    }
  )

  // Compares each author with each other preserving the maximum blogs author
  const maxAuthor =
      blogsPerAuthor.reduce(
        (maxBlogs, author) => {
          return author.blogs > maxBlogs.blogs ? author : maxBlogs
        }
        , { blogs: 0 }
      )

  return maxAuthor.author ? maxAuthor : null
}

const mostLikes = (blogs) => {
  if (!blogs){
    return null
  }

  const authorList = [...new Set(blogs.map((blog) => blog.author))] // Creates unique author array

  const blogsPerAuthor = []

  // Iterates each author to count how many blogs has each of them
  authorList.forEach(
    (author) => {
      let likes = blogs.reduce(
        (total,blog) => {
          return blog.author === author ? total + blog.likes : total
        }
        , 0
      )
      blogsPerAuthor.push({ author, likes })
    }
  )

  // Compares each author with each other preserving the maximum blogs author
  const maxAuthor =
      blogsPerAuthor.reduce(
        (maxLikes, author) => {
          return author.likes > maxLikes.likes ? author : maxLikes
        }
        , { likes: 0 }
      )

  return maxAuthor.author ? maxAuthor : null
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
