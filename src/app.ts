import express,{json,urlencoded} from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from  'compression'
import rateLimit from 'express-rate-limit'

const app = express()

app.use(helmet())
app.use(cors({origin:'*'}))
app.use(compression())
app.use(json())
app.use(urlencoded({extended:true}))

const limiter = rateLimit({
    windowMs:60*1000,
    max:120
})
app.use(limiter)

app.get('/',(req,res)=>{
    res.send({message:"this si teh data"})
})

export default app;