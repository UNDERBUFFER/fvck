import UserModel from "../schemas/user"
import { uploadImage, validFile } from "../utils/storage"
import { createToken } from "../utils/jwt"
import { generate as createHash, verify as verifyHash } from 'password-hash'
import { v4 } from 'uuid'
import { Context } from "koa"


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

        try {
            data.password  = createHash(data.password)
            const user = new UserModel(data)
            await user.save()
        } catch (error) {
            ctx.body = {
                status: 'fail',
                error: error.message.split(':')[0]
            }
            return
        }

        const token = createToken(ctx, data.nickname)
        ctx.body = {
            status: 'ok',
            token
        }
    }
}


export class LoginController extends RegistrationController {
    async post(ctx: Context) {
        const data = <any>ctx.request.body
        const user = <any>(await UserModel.findOne({
            nickname: data.nickname
        }))

        if (!user) {
            ctx.body = {
                status: 'fail',
                error: 'Users would not be found for such a request'
            }
            return
        }
        if (!verifyHash(data.password, user.password)) {
            ctx.body = {
                status: 'fail',
                error: 'Wrong password was entered'
            }
            return
        }

        const token = createToken(ctx, data.nickname)
        ctx.body = {
            status: 'ok',
            token
        }
    }
}

