import PageModel from "../schemas/page"
import UserModel from "../schemas/user"
import { response200, response400, response403 } from "../utils/response"
import { setupPageForm } from "../utils/forms"
import { getPageByNumberId, prepareData } from "../utils/page"
import { uploadImage, validFile } from "../utils/storage"
import { Context } from "koa"


export class AddPageController {
    get(ctx: Context) {
        response200(ctx, {
            form: setupPageForm('String | null | undefined', '(String | null | undefined)[]', '(String)[]')
        })
    }

    async post(ctx: Context) {
        let data = await prepareData(ctx, 0)
        if (!data) return

        try {
            const page = new PageModel(data)
            await page.save()
        } catch (error) {
            response400(ctx, {
                error: error.message.split(':')[0]
            })
            return
        }

        response200(ctx, {})
    }
}


export class EditPageController {
    async get(ctx: Context) {
        const page: any = await getPageByNumberId(ctx)
        if (ctx.user.nickname == page.user.nickname) {
            response200(ctx, {
                page,
                form: setupPageForm('String | null | undefined', '(String | null | undefined)[]', '(String | null | undefined)[]')
            })
        }
        else {
            response403(ctx, {
                'error': 'You cannot edit other people\'s posts'
            })
        }
    }

    async post(ctx: Context) {
        let page: any = await getPageByNumberId(ctx)
        if (!ctx.user.nickname == page.user.nickname) {
            response403(ctx, {
                'error': 'You cannot edit other people\'s posts'
            })
            return
        }

        let data = await prepareData(ctx, 1)
        if (!data) return

        page = await PageModel.findOneAndUpdate({
            numberId: ctx.params.pageId
        }, data, {
            new: true
        })
        response200(ctx, {
            page
        })
    }
}


export class DeletePageController {
    async post(ctx: Context) {
        let page: any = await getPageByNumberId(ctx)
        if (!ctx.user.nickname == page.user.nickname) {
            response403(ctx, {
                'error': 'You cannot delete other people\'s posts'
            })
            return
        }

        await PageModel.deleteOne({
            numberId: ctx.params.pageId
        })

        response200(ctx, {})
    }
}

