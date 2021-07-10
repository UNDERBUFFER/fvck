import UserModel from "../schemas/user"
import { setupUserForm } from "../utils/forms"
import { uploadImage, validFile } from "../utils/storage"
import { createToken } from "../utils/jwt"
import { generate as createHash, verify as verifyHash } from 'password-hash'
import { v4 } from 'uuid'
import { Context } from "koa"


export class RegistrationController {
    get(ctx: Context) {
        ctx.body = {
            form: setupUserForm('String', 'String', 'String | null | undefined')
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
                ctx.status = 400
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
            ctx.status = 400
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
            ctx.status = 400
            return
        }
        if (!verifyHash(data.password, user.password)) {
            ctx.body = {
                status: 'fail',
                error: 'Wrong password was entered'
            }
            ctx.status = 403
            return
        }

        const token = createToken(ctx, data.nickname)
        ctx.body = {
            status: 'ok',
            token
        }
    }
}

