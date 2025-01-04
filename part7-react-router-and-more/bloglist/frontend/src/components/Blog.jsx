import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ value = {} }) => {
  return (
    <div className="bg-secondary rounded-md p-4 my-2 hover:outline hover:outline-2 hover:outline-primary hover:cursor-pointer">
      <Link to={`/blogs/${value.id}`} className="flex">
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
