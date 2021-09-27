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

    for (let b of data) {
        try {
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

            console.log(`Add blog: ${b.title}`);

            await sleep(500);
        } catch(e) {
            console.error(e);
            process.exit(1);
        }
    }
}


main();