import { Context, Next } from "koa"
import { RedisClient } from "redis"


const client = new RedisClient({
    host: process.env.REDIS_CONNECTION_HOST,
    port: Number(process.env.REDIS_CONNECTION_PORT || 6379)
})


export default async function redisConnection(ctx: Context, next: Next) {
    ctx.redisClient = client
    await next()
}

