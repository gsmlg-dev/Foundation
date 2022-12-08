const express = require('express')
const logger = require('morgan')

const autoCropSvg  = require('./index');

const app = express()

app.use(logger('tiny'))
app.use(express.json())

app.post('/api/svg-autocrop', async (req, res, next) => {
  try {
    const { code } = req.body;
    const output = await autoCropSvg(code);
    const skipRiskyTransformations = output.skipRiskyTransformations;
    res.json({ output: output.result, skipRiskyTransformations });
  } catch(e) {
    res.status(500).json({ error: e?.message });
  }
});

app.use((_req, res, next) => {
  res.status(404).send('There is nothing right here! ¯\\_(ツ)_/¯');
});

const port = process.env.PORT || 3050;
app.listen(port, () => {
  console.log('app start at %s', port);
});
