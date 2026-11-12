const BlogForm = ({
  handleSubmit,
  handleCancel,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>create new blog</h2>
        <label>
          title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <div>
          <label>
            author:
            <input type="text" value={author} onChange={handleAuthorChange} />
          </label>
        </div>
        <div>
          <label>
            url:
            <input type="text" value={url} onChange={handleUrlChange} />
          </label>
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleCancel}>
          cancel
        </button>
      </form>
    </div>
  )
}

export default BlogForm
