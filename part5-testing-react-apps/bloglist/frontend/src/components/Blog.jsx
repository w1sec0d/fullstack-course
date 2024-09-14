import { useState } from "react";

const Blog = ({ value, handleLike, handleRemove, showRemove }) => {
  const [detailsShown, setDetailsShown] = useState(false);

  const toggleDetailsShown = () => {
    setDetailsShown((previousState) => !previousState);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <p>{value.title}</p>
      {detailsShown ? (
        <>
          <button onClick={toggleDetailsShown}>Hide</button>
          <p>
            <a href={value.url} target="_BLANK">
              {value.url}
            </a>
          </p>
          <p>
            Likes: {value.likes}{" "}
            <button onClick={() => handleLike(value)}>Like</button>
          </p>
          <p>{value.author}</p>
          <p style={showRemove ? {} : { display: "none" }}>
            <button onClick={() => handleRemove(value)}>Remove</button>
          </p>
        </>
      ) : (
        <button onClick={toggleDetailsShown}>View</button>
      )}
    </div>
  );
};

export default Blog;
