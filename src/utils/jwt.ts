import { v4 } from "uuid"
import { promisify } from "util"
import { Context } from "koa"
import { RedisClient } from "redis"


export function createToken(ctx: Context, nickname: string): string {
    const token = v4()
    const redis: RedisClient = ctx.redisClient
    redis.set(token, nickname)
    return token
}


export async function updateToken(ctx: Context, newNickname: string): Promise<void> {
    const client: RedisClient = ctx.redisClient
    const authorization: string = ctx.request.headers.authorization
    const token = authorization.split(' ')[1]
    const getByPromise = promisify(client.get).bind(client)
    const oldNickname = await getByPromise(token)

    if (newNickname != oldNickname) {
        client.set(token, newNickname)
    }
}

