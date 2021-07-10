import { Context, Next } from "koa"


export async function loginRequired(ctx: Context, next: Next) {
    if (!ctx.user) {
        ctx.body = {
            status: 'fail',
            error: 'Unauthorized user'
        }
        ctx.status = 401
    }
    else {
        await next()
    }
}

