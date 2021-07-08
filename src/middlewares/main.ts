import { Middleware } from "koa"
import redisConnection from "./redis"


const middlewares: Middleware[] = [
    redisConnection,
]

export default middlewares

