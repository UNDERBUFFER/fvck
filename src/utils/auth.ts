import { response401 } from "./response"
import { Context, Next } from "koa"


export async function loginRequired(ctx: Context, next: Next) {
    if (!ctx.user) {
        response401(ctx, {
            error: 'Unauthorized user'
        })
    }
    else {
        await next()
    }
}

