import PageModel from "../schemas/page"
import UserModel from "../schemas/user"
import { uploadImage, validFile } from "./storage"
import { response400 } from "./response"
import { Context } from "koa"


export async function getPageByNumberId(ctx: Context): Promise<any> {
    let page = await PageModel.findOne({
        numberId: ctx.params.pageId
    })
    return page
}


export async function prepareData(ctx: Context, move: 0 | 1): Promise<any> {
    let data: any = {
        ...(ctx.request.body as object),
        user: ctx.user
    }

    if (move == 0) {
        if (!data.attachment || data.attachment.length == 0) {
            response400(ctx, {
                error: 'No images have been uploaded'
            })
            return null
        }
    }

    if (data.endpoint.filter( (nickname: string) => {
        return nickname == ctx.user.nickname
    } ).length != 0) {
        response400(ctx, {
            error: 'You are in the always available list by default'
        })
        return null
    }

    for (let i = 0; i < (data.attachment || []).length; i++) {
        let picture = data.attachment[i]
        if (await validFile(picture)) {
            data.attachment[i] = await uploadImage(picture)
        }
        else {
            response400(ctx, {
                error: 'Invalid image type'
            })
            return null
        }
    }

    data.endpoint = await UserModel.find({
        nickname: {
            $in: data.endpoint
        }
    })

    return data
}

