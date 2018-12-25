import { Console } from 'console'
import express from 'express'
import process from 'process'

const app = express()
const port = 8000
const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

// app.use('/', express.static('static'))
app.get('/', (req, res) => {
  res.send('swaef')
})
app.listen(port, () => logger.log(`Example app listening on port ${port}!`))
