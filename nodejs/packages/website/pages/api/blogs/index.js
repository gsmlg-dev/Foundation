import blogList from '../../../data/blogs.json';

const blogsHandler = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  const content = blogList.slice().map((blog) => ({
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    date: blog.data,
    author: blog.author,
  }));
  res.send(JSON.stringify(content));
};

export default blogsHandler;

