export const sortBlogsByLikes = (blogs) => 
    blogs.sort((a, b) => b.likes - a.likes)

