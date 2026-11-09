import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login.js';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const Notification = ({ message }) => {
    console.log(message);
    if (message === null) {
      return null;
    } else if (message.type === 'error') {
      return <div className="error">{message.message}</div>;
    } else return <div className="success">{message.message}</div>;
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
      blogService.setToken(user.token); //tekoäly sano et tääki ois hyvä olla: 'if later blog actions need authorization. On logout, clear that in-memory token too if your service supports it.'
    } catch {
      // console.log('logging in with', username, 'failed');
      // virheviesti epäonnistuneelle kirjautumiselle
      setToast({
        message: `wrong username or password`,
        type: 'error',
      });
      setTimeout(() => {
        setToast(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const blog = await blogService.createBlog({ title, author, url });
      setBlogs((currentblogs) => currentblogs.concat(blog));
      setTitle('');
      setAuthor('');
      setUrl('');
      // onnistumisviesti ja ajastin setToastille
      setToast({
        message: `a new blog ${blog.title} by ${blog.author} added`,
        type: 'success',
      });
      setTimeout(() => {
        setToast(null);
      }, 5000);
    } catch {
      console.log('failed adding a blog');
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={toast} />
        <form onSubmit={handleLogin}>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <p>{user.name} logged in</p>
      <div>
        <button type="button" onClick={handleLogout}>
          {' '}
          logout
        </button>
        {/* toastin paikka */}
        <Notification message={toast} />
      </div>
      <form onSubmit={handleSubmit}>
        <h2>create new blog</h2>
        <label>
          title:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <div>
          <label>
            author:
            <input
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
