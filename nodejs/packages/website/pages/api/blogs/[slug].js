import path from 'path';
import fs from 'fs';
import getConfig from 'next/config'

import { blogs } from './index';

export default (req, res) => {
  const { serverRuntimeConfig } = getConfig()
  const dir = path.join(serverRuntimeConfig.PROJECT_ROOT, './data/blogs');

  const { query: { slug } } = req;
  const blog = blogs.find((b) => b.name === slug);

  if (blog) {
    const { name } = blog;
    const blogPath = path.join(dir, `${name}.md`);
    if (fs.existsSync(blogPath)) {
      const content = fs.readFileSync(blogPath, { encoding: 'utf-8', flag: 'r' });
      blog.content = content;

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(blog));
    } else {
      notFound(res);
    }
  } else {
    notFound(res);
  }
}

const notFound = (res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(null);
}
