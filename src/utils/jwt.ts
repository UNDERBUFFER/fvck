import { v4 } from 'uuid'
import { Context } from 'koa';
import { RedisClient } from 'redis';


export function createToken(ctx: Context, nickname: string): string {
    const token = v4()
    const redis: RedisClient = ctx.redisClient
    redis.set(token, nickname)
    return token
}

