import UserModel from "../schemas/user"
import { Context } from "koa";


export async function getUserByNickname(ctx: Context): Promise<any> {
    let nickname = ctx.params.nickname
    let user: any = null
    if (!nickname || nickname == ctx.user.nickname) {
        user = ctx.user
    }
    else {
        user = await UserModel.findOne({
            nickname
        })
    }
    return user
}

