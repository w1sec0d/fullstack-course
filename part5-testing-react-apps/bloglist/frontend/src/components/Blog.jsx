import { useState } from "react";

const Blog = ({ value }) => {
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
          <p>{value.author}</p>
          <p>Likes: {value.likes}</p>
          <p>
            <a href={value.url} target="_BLANK">
              {value.url}
            </a>
          </p>
          <button onClick={toggleDetailsShown}>Hide</button>
        </>
      ) : (
        <button onClick={toggleDetailsShown}>View</button>
      )}
    </div>
  );
};

export default Blog;
