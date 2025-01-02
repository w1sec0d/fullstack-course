import { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';
import { useAppContext } from '../state/useAppContext';
import useMutateBlog from '../hooks/useMutateBlog';

const BlogForm = ({ creationHandler, user }) => {
  const { dispatch } = useAppContext();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const newBlogMutation = useMutateBlog(blogService.createBlog)

  const handleCreation = async (event) => {
    event.preventDefault();
    newBlogMutation.mutate(
      { title, author, url },
      {
        onSuccess: (data) => {
          console.log('Blog created:', data);
          const userId = data.user;
          let newRequest = { ...data };

          // Adds user info to locally added blog
          newRequest.user = {
            id: userId,
            username: user.username,
            name: user.name,
          };

          dispatch({
            type: 'ADD_BLOG',
            payload: newRequest,
          });

          setTitle('');
          setAuthor('');
          setUrl('');

          dispatch({
            type: 'SET_NOTIFICATION',
            payload: {
              title: 'Blog created successfully',
              icon: 'success',
              timer: 4000,
              toast: true,
              showCloseButton: true,
              position: 'top-right',
            },
          });
        },
      }
    );
  };

  return (
    <form
      onSubmit={
        creationHandler ? creationHandler(title, author, url) : handleCreation
      }
    >
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          autoComplete="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          autoComplete="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input
          type="text"
          name="url"
          id="url"
          autoComplete="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

BlogForm.propTypes = {
  creationHandler: PropTypes.func,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogForm;