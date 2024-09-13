import { useState, useEffect } from "react";

import Swal from "sweetalert2";

import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";

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
    Swal.fire({
      title: "Logged out successfully",
      icon: "success",
      timer: 4000,
      toast: true,
      position: "top-right",
    });
  };

  const handleLike = async (blog) => {
    const putRequestObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    const updatedBlog = await blogService.updateBlog(blog.id, putRequestObject);
    if (updatedBlog) {
      let updatedBlogs = [...blogs];
      const blogIndexToUpdate = updatedBlogs.findIndex(
        (oldBlog) => oldBlog.id === blog.id
      );
      updatedBlogs[blogIndexToUpdate].likes += 1;
      setBlogs(updatedBlogs);
    }
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
        <Togglable buttonLabel="New Blog">
          <BlogForm setBlogs={setBlogs} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog value={blog} key={blog.id} handleLike={handleLike} />
        ))}
      </div>
    </>
  );
};

export default App;
