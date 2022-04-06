const fs = require('fs/promises');
const { default: axios } = require('axios');

const sleep = (n) => {
  return new Promise((fulfill) => {
    setTimeout(() => {
      fulfill();
    }, n);
  });
};

const main = async () => {
  const filePath = await fs.realpath(`${__dirname}/../data/blogs.json`);
  const f = await fs.readFile(filePath);
  const data = JSON.parse(f);

  const blogs = data.reverse();

  for (let b of blogs) {
    try {
      console.log(`Begin add blog: ${b.id} ${b.title}`);

      await axios({
        method: 'post',
        url: 'http://localhost:4000/api/blogs',
        data: { blog: b },
      });

      console.log(`Add blog done: ${b.id} ${b.title}`);

      await sleep(1000);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
};

main();
