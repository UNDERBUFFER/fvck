import identifyUser from "./auth"
import redisConnection from "./redis"
import { Middleware } from "koa"
import bodyParser from "koa-bodyparser"
import logger from "koa-logger"


const middlewares: Middleware[] = [
    redisConnection,
    identifyUser,
    bodyParser(),
    logger()
]

export default middlewares

