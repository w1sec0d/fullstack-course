import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ value = {}, handleLike, handleRemove, showRemove }) => {
  const [detailsShown, setDetailsShown] = useState(false)

  const toggleDetailsShown = () => {
    setDetailsShown((previousState) => !previousState)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <p>{value.title}</p>
      <p>{value.author}</p>
      {detailsShown ? (
        <>
          <button onClick={toggleDetailsShown}>Hide</button>
          <p>
            <a href={value.url} target="_BLANK">
              {value.url}
            </a>
          </p>
          <p data-testid={`likes_${value.title}`}>
            Likes: {value.likes}{' '}
            <button onClick={() => handleLike(value)}>Like</button>
          </p>
          <p style={showRemove ? {} : { display: 'none' }}>
            <button onClick={() => handleRemove(value)}>Remove</button>
          </p>
        </>
      ) : (
        <button onClick={toggleDetailsShown}>View</button>
      )}
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
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  showRemove: PropTypes.bool.isRequired,
}

export default Blog