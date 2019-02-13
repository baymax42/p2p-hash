import { Console } from 'console'
import express from 'express'
import process from 'process'

const app = express()
const port = 8000
const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

let current: any = []
let file: string = '/'

process.on('message', (result: any) => {
  if (result.type === 'message' && result.content) {
    current = result.content
    file = result.file
  }
})

app.use('/', express.static('../static'))
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.use('/hashes', express.static('/'))
app.get('/hashes', (req, res) => {
  res.send(current.solved)
})

app.post('/api/hashes', (req, res) => {
  res.send(JSON.stringify(current))
})

app.listen(port, () => logger.log(`Example app listening on port ${port}!`))
