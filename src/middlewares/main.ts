import identifyUser from "./auth"
import redisConnection from "./redis"
import bodyParser from "koa-bodyparser"
import logger from "koa-logger"
import serve from "koa-static"
import { Middleware } from "koa"


const middlewares: Middleware[] = [
    redisConnection,
    identifyUser,
    bodyParser({jsonLimit: '50mb'}),
    logger(),
    serve(__dirname + '/../../images/')
]


export default middlewares

