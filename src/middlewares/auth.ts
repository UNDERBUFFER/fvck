import UserModel from "../schemas/user"
import { promisify } from "util"
import { Context, Next } from "koa"
import { RedisClient } from "redis"


export default async function identifyUser(ctx: Context, next: Next) {
    ctx.user = null

    const client: RedisClient = ctx.redisClient
    const authorization: string = ctx.request.headers.authorization

    let nickname: string | null = null
    if (authorization && authorization.indexOf('Token ') != -1) {
        const token = authorization.split(' ')[1]
        const getByPromise = promisify(client.get).bind(client)
        nickname = await getByPromise(token)
    }

    if (nickname) {
        const user = await UserModel.findOne({ nickname })
        ctx.user = user
    }

    await next()
}

