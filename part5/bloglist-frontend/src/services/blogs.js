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

const createBlog = async (blog) => {
  // Axios takes three parameters as its arguments: url, data, config
  // url = where it posts, data = the blog, config = the token
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: token },
  });
  console.log('hello', response.data);
  return response.data;
};

export default { setToken, getAll, createBlog };
