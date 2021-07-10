import UserModel from "../schemas/user"
import { uploadImage, validFile } from "../utils/storage"
import { Context } from "koa"
import { RedisClient } from "redis"
import { generate as createHash } from 'password-hash'
import { v4 } from 'uuid'


export class RegistrationController {
    get(ctx: Context) {
        ctx.body = {
            nickname: {
                type: 'String',
                required: true,
                unique: true
            },
            password: {
                type: 'String',
                required: true,
            },
            avatar: {
                type: 'String | Boolean',
                required: false,
            }
        }
    }

    async post(ctx: Context) {
        const data = <any>ctx.request.body
        if (data.avatar) {
            if (await validFile(data.avatar)) {
                data.avatar = await uploadImage(data.avatar)
            }
            else {
                ctx.body = {
                    status: 'fail',
                    error: 'Invalid image type'
                }
                return
            }
        }
        data.password  = createHash(data.password)

        const user = new UserModel(data)
        try {
            await user.save()
        } catch (error) {
            ctx.body = {
                status: 'fail',
                error: error.message
            }
            return
        }

        const token = v4()
        ctx.body = {
            status: 'ok',
            token
        }
        const redis: RedisClient = ctx.redisClient
        redis.set(token, data.nickname)
    }
}


export class LoginController extends RegistrationController {
    async post(ctx: Context) {
        ctx.body = {
            detail: 'to be continued!'
        }
    }
}

