import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import router from "./routes/index.route.js"
import { dbConnection } from './database/database.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 9000
const CLIENT = process.env.CLIENT_ORIGIN

app.use(cors({
    origin: CLIENT,
}))

app.listen(PORT, () => {
    dbConnection()
    console.log(`Listening on PORT:${PORT} client: ${CLIENT}`)
})

app.use(express.json())
app.use('/api', router)

app.use((req, res) => {
    res.status(404).send('End Point Not Found')
})



