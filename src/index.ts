import app from './app'
import { config  } from './config'
import pino from 'pino'

const logger = pino()

const port = config.port || 4000
app.listen(port,()=>{
    logger.info(`Server started on the Port ${port}`)
})