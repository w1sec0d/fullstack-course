const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const result = blogs.reduce(
    (prev, current) => {
      return current.likes > prev.likes ? current : prev;
    },
    { likes: -Infinity }
  );
  console.log(result);
  return { title: result.title, author: result.author, likes: result.likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
