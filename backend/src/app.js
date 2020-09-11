import express from 'express'
import routes from './routes'
import 'dotenv/config'
import cors from 'cors'
import './database'
class App{
    constructor(){
        this.server= express()
        this.server.use(cors({
        'origin': '*',
        'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        }))
        this.middlewares()
        this.routes()

    }
    middlewares(){
        this.server.use(express.json())
    }
    routes(){
        this.server.use(routes)
    }
}
export default new App().server