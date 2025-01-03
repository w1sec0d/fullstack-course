import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ value = {} }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <Link to={`/blogs/${value.id}`}>
        <p>{value.title}</p>
      </Link>
    </div>
  )
}
Blog.propTypes = {
  value: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
}

export default Blog
