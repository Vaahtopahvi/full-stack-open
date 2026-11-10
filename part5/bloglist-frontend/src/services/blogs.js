import axios from 'axios';
const baseUrl = '/api/blogs';

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const increaseLikeCount = async (blog) => {
  console.log('täs on blogi', blog);
  // luodaan uusi post url
  const newUrl = baseUrl + '/' + blog.id;
  console.log('uusi url', newUrl);
  // luodaan päivitetty blogi
  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    // (?) tarkoittaa, että käytä käyttäjän ID:tä, jos blog.user on olemassa
    user: blog.user?.id,
  };
  console.log(updatedBlog);

  // läheteään uusi blogi sitä vastaavaan osoitteeseen
  const response = await axios.put(newUrl, updatedBlog, {
    headers: { Authorization: token },
  });

  //tulostetaan uusi blogi
  console.log('ja tässä on vastaus', response.data);
  return response.data;
};

const createBlog = async (blog) => {
  // Axios takes three parameters as its arguments: url, data, config
  // url = where it posts, data = the blog, config = the token
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: token },
  });
  console.log('hello. we added this blog:', response.data);
  return response.data;
};

export default { setToken, getAll, createBlog, increaseLikeCount };
