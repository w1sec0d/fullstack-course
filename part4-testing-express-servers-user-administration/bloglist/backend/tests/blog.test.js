const { test, describe, after } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { shallowEqualityCheck } = require('./test_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
]

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty lists is 0', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculted right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  const multipleFavoriteBlogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 12,
      __v: 12,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0,
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0,
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0,
    },
  ]
  test('of a empty list is an empty object', () => {
    return assert.deepStrictEqual(listHelper.favoriteBlog([]), {})
  })
  test('of a big list is the correct', () => {
    const result = listHelper.favoriteBlog(blogs)
    return assert.deepStrictEqual(result, {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
  test('of a big list with multiple popular blogs is the first popular blog', () => {
    const result = listHelper.favoriteBlog(multipleFavoriteBlogs)
    return assert.deepStrictEqual(result, {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 12,
    })
  })
})

describe('most blogs',() => {
  test('of a list is the correct', () => {
    assert.strictEqual(
      shallowEqualityCheck(
        listHelper.mostBlogs(blogs),
        {
          author: 'Robert C. Martin',
          blogs: 3
        }
      ),
      true
    )
  })
  test('of a list with many top bloggers is any of them', () => {
    let blogsCopy = [...blogs]
    blogsCopy = blogsCopy.slice(0,-1)

    const authorA = {
      author: 'Robert C. Martin',
      blogs: 2
    }
    const authorB = {
      author: 'Edsger W. Dijkstra',
      blogs: 2
    }

    return listHelper.mostBlogs(blogsCopy) === authorA || listHelper.mostBlogs(blogsCopy) === authorB
  })

  test('of an empty list is null',() => {
    assert.strictEqual(
      listHelper.mostBlogs([]),
      null
    )
  })
})

describe('most likes',() => {
  test('of a list is the correct', () => {
    assert.strictEqual(
      shallowEqualityCheck(
        listHelper.mostLikes(blogs),
        {
          author: 'Edsger W. Dijkstra',
          likes: 17
        }
      ),
      true
    )
  })
  test('of a list with many top bloggers is any of them', () => {
    let blogsCopy = [...blogs]
    blogsCopy[blogsCopy.length - 2].likes = 5

    const authorA = {
      author: 'Robert C. Martin',
      likes: 17
    }
    const authorB = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    return listHelper.mostLikes(blogsCopy) === authorA || listHelper.mostLikes(blogsCopy) === authorB
  })

  test('of an empty list is null',() => {
    assert.strictEqual(
      listHelper.mostLikes([]),
      null
    )
  })
})

after()