import blogList from '../../../data/blogs.json';

const blogContentHandler = (req, res) => {
  const {
    query: {slug},
  } = req;
  const blog = blogList.find((b) => b.slug === slug);

  if (blog) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(blog));
  } else {
    notFound(res);
  }
};

const notFound = (res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(null);
};

export default blogContentHandler;
