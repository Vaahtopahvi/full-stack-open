import { useState } from 'react';

const Blog = ({ blog, onLike }) => {
  // changed from expression bodied component to a function body
  const [showDetails, setShowDetails] = useState(false);
  // style for detailed blog
  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  console.log(typeof onLike);

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        {/* button to show and hide details */}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}
            <button onClick={() => onLike(blog)}>like</button>
          </div>

          {/* jos on käyttäjän luoma, niin näytä kuka loi blogin */}
          {blog.user && <div>added: {blog.user.name}</div>}
        </div>
      )}
    </div>
  );
};

export default Blog;
