import path from 'path'
import express, { Express, NextFunction, Request, Response } from 'express'

const app: Express = express()

app.use(express.json())
app.use('/',express.static(path.join(__dirname, '../../client/dist')))
app.use(function(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})