import identifyUser from "./auth"
import redisConnection from "./redis"
import bodyParser from "koa-bodyparser"
import logger from "koa-logger"
import { Middleware } from "koa"


const middlewares: Middleware[] = [
    redisConnection,
    identifyUser,
    bodyParser({jsonLimit: '50mb'}),
    logger()
]


export default middlewares

