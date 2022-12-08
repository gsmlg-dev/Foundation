const express = require('express')
const logger = require('morgan')

const autoCropSvg  = require('./index');

const app = express()

app.use(logger())
app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/api/svg-autoscrop', async (req, res, next) => {
  const { code } = req.body;
  const output = await autoCropSvg(inputContent);
  const skipRiskyTransformations = output.skipRiskyTransformations;
  res.json({ output: output.result, skipRiskyTransformations });
});

app.listen(process.env.PORT || 3050);
