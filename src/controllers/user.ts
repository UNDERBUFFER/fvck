import UserModel from "../schemas/user"
import { setupUserForm } from "../utils/forms"
import { Context } from "koa"
import { validFile, uploadImage } from "../utils/storage"
import { updateToken } from "../utils/jwt"


export class UserController {
    async get(ctx: Context) {
        let nickname = ctx.params.nickname
        let user: any = null

        if (!nickname || nickname == ctx.user.nickname) {
            nickname = ctx.user.nickname
            user = ctx.user
        }
        else {
            user = await UserModel.findOne({
                nickname
            })
        }

        if (user) {
            ctx.body = { user }
            if (nickname == ctx.user.nickname) {
                ctx.body =  {
                    ...(ctx.body as object),
                    form: setupUserForm('String | null | undefined', 'String | null | undefined', 'String | null | undefined')
                }
            }
        }
        else {
            ctx.body = {
                status: 'fail',
                error: 'Users would not be found for such a request'
            }
            ctx.status = 400
        }
    }

    async post(ctx: Context) {
        if (ctx.params.nickname && (ctx.params.nickname != ctx.user.nickname)) {
            ctx.body = {
                status: 'fail',
                error: 'The end user is different from the real one'
            }
            ctx.status = 403
            return
        }

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

        const newUser = <any>(await UserModel.findOneAndUpdate({
            nickname: ctx.user.nickname
        }, data, {
            new: true
        }))
        updateToken(ctx, newUser.nickname)

        ctx.body = {
            user: newUser
        }
    }
}


export class FriendsController {
    get(ctx: Context) {
        ctx.body = {
            detail: 'to be continued!'
        }
    }
}


export class PagesController {
    get(ctx: Context) {
        ctx.body = {
            detail: 'to be continued!'
        }
    }
}


export class AddFriendshipController {
    post(ctx: Context) {
        ctx.body = {
            detail: 'to be continued!'
        }
    }
}


export class DeleteFriendshipController {
    post(ctx: Context) {
        ctx.body = {
            detail: 'to be continued!'
        }
    }
}

