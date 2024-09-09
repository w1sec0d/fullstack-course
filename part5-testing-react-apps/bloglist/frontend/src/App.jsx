import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const fetchedBlogs = await blogService.getBlogs();
      setBlogs(fetchedBlogs);
    }
    fetchBlogs();
  }, []);

  console.log(user);

  if (user === null) {
    return <LoginForm setUser={setUser} />;
  }

  return (
    <>
      <h2>Blogs</h2>
      <div>
        <p>
          Welcome <b>{user.username}</b>
        </p>
        <hr />
        {blogs.map((blog) => (
          <p key={blog.id}>
            {blog.title} {blog.author}
          </p>
        ))}
      </div>
    </>
  );
};

export default App;
