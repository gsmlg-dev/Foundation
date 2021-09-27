import * as fs from 'fs/promises';
import * as path from 'path';
import axios from 'axios';

import data from '../src/blogList.js';

const sleep = (n) => {
    return new Promise((fulfill) => {
        setTimeout(() => {
            fulfill();
        }, n);
    });
};

const main = async () => {
    console.table(data);

    const blogs = data.reverse();

    for (let b of blogs) {s
        try {
            console.log(`Begin add blog: ${b.id} ${b.title}`);
            const p = path.join(process.cwd(), 'data/blogs', `${b.name}.md`);
            const c = await fs.readFile(p, { encoding: 'utf8' });
            const d = {
                ...b,
                slug: b.name,
                content: c,
            };

            await axios({
                method: 'post',
                url: 'http://localhost:4000/api/blogs',
                data: { blog: d },
            });

            console.log(`Add blog done: ${b.id} ${b.title}`);

            await sleep(1000);
        } catch(e) {
            console.error(e);
            process.exit(1);
        }
    }
}


main();
