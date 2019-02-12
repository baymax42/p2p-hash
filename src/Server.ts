import { Console } from 'console'
import express from 'express'
import process from 'process'

const app = express()
const port = 8000
const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

async function getSolved () {
  if (process != null) {
    // @ts-ignore
    process.send('getHashes')
    return new Promise((resolve, reject) => {
      process.once('message', (result: any) => {
        if (result.type === 'message' && result.content) {
          resolve(result.content)
        } else {
          reject()
        }
      })
    })
  } else {
    throw ReferenceError('This process should be spawned as child process')
  }
}

app.use('/', express.static('../static'))
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.post('/api/hashes', (req, res) => {
  getSolved().then((value) => {
    res.send(JSON.stringify(value))
  }).catch(() => {
    res.sendStatus(500)
  })
})

app.listen(port, () => logger.log(`Example app listening on port ${port}!`))
