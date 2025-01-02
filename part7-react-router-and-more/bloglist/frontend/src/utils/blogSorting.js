export const sortBlogsByLikes = (blogs) => {
    const blogsCopy = [...blogs]
    return blogsCopy.sort((a, b) => b.likes - a.likes)
}
