import UserModel from "../schemas/user"
import FriendsModel from "../schemas/friendship"
import PagesModel from "../schemas/post"
import { setupUserForm } from "../utils/forms"
import { validFile, uploadImage } from "../utils/storage"
import { updateToken } from "../utils/jwt"
import { getUserByNickname } from "../utils/user"
import { Context } from "koa"


export class UserController {
    async get(ctx: Context) {
        const user = await getUserByNickname(ctx)
        const nickname = user.nickname

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
    async get(ctx: Context) {
        const user = await getUserByNickname(ctx)

        const friends: any[] = await FriendsModel.find({
            $or: [
                { user },
                { endpoint: user }
            ]
        })

        ctx.body = {
            friends
        }
    }
}


export class PagesController {
    async get(ctx: Context) {
        const user = await getUserByNickname(ctx)
        const nickname = user.nickname
        let query: any = {}
        if (nickname == ctx.user.nickname) query = {
            $or: [
                { user },
                { endpoint: { $in: ctx.user } }
            ]
        }
        else query = {
            user,
            endpoint: { $in: ctx.user }
        }

        const pages: any[] = await PagesModel.find(query)

        ctx.body = {
            pages
        }
    }
}


export class AddFriendshipController {
    async post(ctx: Context) {
        const user = await getUserByNickname(ctx)
        const nickname = user.nickname
        if (nickname == ctx.user.nickname) {
            ctx.body = {
                status: 'fail',
                error: 'You can\'t create friendship with yourself'
            }
            ctx.status = 400
            return
        }

        const friendship = new FriendsModel({ // TODO если такой дружбы нет, а если есть - подтвердить
            user: ctx.user,
            endpoint: user,
            confirmed: false
        })
        try {
            await friendship.save()
        } catch (error) {
            ctx.body = {
                status: 'fail',
                error: error.message.split(':')[0]
            }
            ctx.status = 400
            return
        }
        ctx.body = {
            status: 'ok'
        }
    }
}


export class DeleteFriendshipController {
    async post(ctx: Context) {
        const user = await getUserByNickname(ctx)
        const nickname = user.nickname
        if (nickname == ctx.user.nickname) {
            ctx.body = {
                status: 'fail',
                error: 'You can\'t destroy friendship with yourself'
            }
            ctx.status = 400
            return
        }

        await FriendsModel.deleteOne({
            $or: [
                { user, endpoint: ctx.user  },
                { user: ctx.user, endpoint: user }
            ]
        })

        ctx.body = {
            status: 'ok'
        }
    }
}

