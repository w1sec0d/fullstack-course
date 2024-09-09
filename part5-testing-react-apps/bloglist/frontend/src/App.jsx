import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";

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

  useEffect(() => {
    const savedUser = window.localStorage.getItem("bloglistAppUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogOut = () => {
    window.localStorage.removeItem("bloglistAppUser");
    setUser(null);
  };

  if (user === null) {
    return <LoginForm setUser={setUser} />;
  }

  return (
    <>
      <h2>Blogs</h2>
      <div>
        <p>
          Welcome <b>{user.username}</b>{" "}
          <button onClick={handleLogOut}>Log Out</button>
        </p>
        <hr />
        <BlogForm setBlogs={setBlogs} />
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
