import UserModel from "../schemas/user"
import FriendsModel from "../schemas/friendship"
import PagesModel from "../schemas/page"
import { setupUserForm } from "../utils/forms"
import { response200, response400, response403 } from "../utils/response"
import { validFile, uploadImage } from "../utils/storage"
import { updateToken } from "../utils/jwt"
import { getUserByNickname } from "../utils/user"
import { Context } from "koa"


export class UserController {
    async get(ctx: Context) {
        const user = await getUserByNickname(ctx)
        const nickname = user.nickname

        let body: any = {}
        if (user) {
            body = { user }
            if (nickname == ctx.user.nickname) {
                body =  {
                    ...body,
                    form: setupUserForm('String | null | undefined', 'String | null | undefined', 'String | null | undefined')
                }
            }
            response200(ctx, { body })
        }
        else {
            response400(ctx, {
                error: 'Users would not be found for such a request'
            })
        }
    }

    async post(ctx: Context) {
        if (ctx.params.nickname && (ctx.params.nickname != ctx.user.nickname)) {
            response403(ctx, {
                error: 'The end user is different from the real one'
            })
            return
        }

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

        const newUser = <any>(await UserModel.findOneAndUpdate({
            nickname: ctx.user.nickname
        }, data, {
            new: true
        }))
        updateToken(ctx, newUser.nickname)

        response200(ctx, {
            user: newUser
        })
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

        response200(ctx, { friends })
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

        response200(ctx, { pages })
    }
}


export class AddFriendshipController {
    async post(ctx: Context) {
        const user = await getUserByNickname(ctx)
        const nickname = user.nickname
        if (nickname == ctx.user.nickname) {
            response400(ctx, {
                error: 'You can\'t create friendship with yourself'
            })
            return
        }

        let friendship: any = await FriendsModel.findOne({
            user,
            endpoint: ctx.user
        })

        if (friendship) {
            friendship.confirmed = true
        }
        else {
            friendship = new FriendsModel({
                user: ctx.user,
                endpoint: user,
                confirmed: false
            })
        }

        try {
            await friendship.save()
        } catch (error) {
            response400(ctx, {
                error: error.message.split(':')[0]
            })
            return
        }
        response200(ctx, {})
    }
}


export class DeleteFriendshipController {
    async post(ctx: Context) {
        const user = await getUserByNickname(ctx)
        const nickname = user.nickname
        if (nickname == ctx.user.nickname) {
            response400(ctx, {
                error: 'You can\'t destroy friendship with yourself'
            })
            return
        }

        await FriendsModel.deleteOne({
            $or: [
                { user, endpoint: ctx.user  },
                { user: ctx.user, endpoint: user }
            ]
        })

        response200(ctx, {})
    }
}

