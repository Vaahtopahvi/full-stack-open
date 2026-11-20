import { useState } from 'react'

// advanced type shi
// luotiin title author ja url App komponentista tähän olioon
const emptyBlog = { title: '', author: '', url: '' }

// blogin luonti
const BlogForm = ({ createBlog, handleCancel }) => {
  // newBlog on vastuussa nyt blogin luomisesta
  // alustetaan se emptyBlogilla
  const [newBlog, setNewBlog] = useState(emptyBlog)

  // tämä käyttää jokaisen kentän nimeä (title, author, url) ja päivittää siihen vastaavan uuden arvon
  const handleChange = ({ target }) => {
    setNewBlog({ ...newBlog, [target.name]: target.value })
  }

  // lomakkeen lähettäminen
  const handleSubmit = async (event) => {
    event.preventDefault()
    // kutsutaan createBlogia ja lähetetään sinne uusi blogi
    const createdBlog = await createBlog(newBlog)
    if (createdBlog) {
      // alustetaan kentät taas tyhjäksi
      setNewBlog(emptyBlog)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>create new blog</h2>
        <label>
          title:
          <input
            type="text"
            name="title"
            value={newBlog.title}
            // käytetään tekstin päivittämisen apuna handleChangea
            onChange={handleChange}
          />
        </label>
        <div>
          <label>
            author:
            <input
              type="text"
              name="author"
              value={newBlog.author}
              // käytetään tekstin päivittämisen apuna handleChangea
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              name="url"
              value={newBlog.url}
              // käytetään tekstin päivittämisen apuna handleChangea
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">create</button>
        {/* jos täytyy cancel nii kutsutaan sitä Appista */}
        <button type="button" onClick={handleCancel}>
          cancel
        </button>
      </form>
    </div>
  )
}

export default BlogForm
