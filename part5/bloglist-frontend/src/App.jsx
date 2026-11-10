import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login.js';
import BlogForm from './components/BlogForm.jsx';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [toast, setToast] = useState(null);
  const [showBlogForm, setShowBlogForm] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const Notification = ({ message }) => {
    // console.log(message);
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

  const handleLikes = async (blog) => {
    try {
      const updatedBlog = await blogService.increaseLikeCount(blog);
      console.log('Appin päivitetty blogi', updatedBlog);
      // blogilistan päivitys currentBlogeilla
      setBlogs((currentBlogs) =>
        // käydään currentBlogs läpi
        currentBlogs.map((currentBlog) =>
          // jos currentBlogin id vastaa päivitetyn blogin id
          currentBlog.id === updatedBlog.id
            ? // populatetaan ainoastaan päivitetyn blogin user property alkuperäisellä blog.userilla
              { ...updatedBlog, user: blog.user }
            : // muuten ei tehdä mitään
              currentBlog,
        ),
      );
    } catch {
      setToast({
        message: 'failed adding a like',
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

  const handleCancel = () => setShowBlogForm(false);

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
      setShowBlogForm(false);
      setTimeout(() => {
        setToast(null);
      }, 5000);
    } catch {
      console.log('failed adding a blog');
    }
  };

  const renderBlogForm = () => {
    const hideForm = { display: showBlogForm ? 'none' : '' };
    const showForm = { display: showBlogForm ? '' : 'none' };

    return (
      <div>
        <div style={hideForm}>
          <button type="button" onClick={() => setShowBlogForm(true)}>
            create new blog
          </button>
          {/* console.log('nyt on', {hideForm}) */}
        </div>
        <div style={showForm}>
          <BlogForm
            title={title}
            author={author}
            url={url}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
        </div>
      </div>
    );
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
        <div>{renderBlogForm()}</div>
      </div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        // luodaan avainarvo, näytetään blogi ja lisätään joku toiminnallisuus
        <Blog key={blog.id} blog={blog} onLike={handleLikes} />
      ))}
    </div>
  );
};

export default App;
