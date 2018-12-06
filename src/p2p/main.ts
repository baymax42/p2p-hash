import axios from 'axios'
import { Console } from 'console'
import process from 'process'

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const handler = () => {
  axios.get('http://server:8000')
    .then((req) => {
      logger.log(req.data)
    })
    .catch(() => {
      logger.log('nope')
    })
}

setTimeout(handler, 1000)
