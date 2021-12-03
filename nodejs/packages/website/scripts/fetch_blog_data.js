const fs = require('fs/promises');
const path = require('path');
const axios = require('axios').default;

const DATA_FILE = path.join(__dirname, '..', 'data', 'blogs.json');

const main = async () => {
  const response = await axios.get('https://gsmlg.org/api/blogs', { responseType: 'json' });
  
  const blogList = response.data.data;
  
  const content = JSON.stringify(blogList, null, 2);

  await fs.writeFile(DATA_FILE, content);
};



main();
