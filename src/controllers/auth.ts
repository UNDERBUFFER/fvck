import UserModel from "../schemas/user"
import { setupUserForm } from "../utils/forms"
import { response200, response400, response403 } from "../utils/response"
import { uploadImage, validFile } from "../utils/storage"
import { createToken } from "../utils/jwt"
import { generate as createHash, verify as verifyHash } from "password-hash"
import { Context } from "koa"


export class RegistrationController {
    get(ctx: Context) {
        response200(ctx, {
            form: setupUserForm('String', 'String', 'String | null | undefined')
        })
    }

    async post(ctx: Context) {
        const data = <any>ctx.request.body
        if (data.avatar) {
            if (await validFile(data.avatar)) {
                data.avatar = await uploadImage(data.avatar)
            }
            else {
                response400(ctx, {
                    error: 'Invalid image type'
                })
                return
            }
        }

        try {
            data.password  = createHash(data.password)
            const user = new UserModel(data)
            await user.save()
        } catch (error) {
            response400(ctx, {
                error: error.message.split(':')[0]
            })
            return
        }

        const token = createToken(ctx, data.nickname)
        response200(ctx, { token })
    }
}


export class LoginController extends RegistrationController {
    async post(ctx: Context) {
        const data = <any>ctx.request.body
        const user = <any>(await UserModel.findOne({
            nickname: data.nickname
        }))

        if (!user) {
            response400(ctx, {
                error: 'Users would not be found for such a request'
            })
            return
        }
        if (!verifyHash(data.password, user.password)) {
            response403(ctx, {
                error: 'Wrong password was entered'
            })
            return
        }

        const token = createToken(ctx, data.nickname)
        response200(ctx, { token })
    }
}

