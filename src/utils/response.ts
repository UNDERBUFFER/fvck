import { Context } from "koa"


export function response200(ctx: Context, responseData: any) {
    ctx.status = 200
    ctx.body = {
        status: 'ok',
        ...responseData
    }
}


export function response400(ctx: Context, responseData: any) {
    ctx.status = 400
    ctx.body = {
        status: 'fail',
        ...responseData
    }
}


export function response401(ctx: Context, responseData: any) {
    ctx.status = 401
    ctx.body = {
        status: 'fail',
        ...responseData
    }
}


export function response403(ctx: Context, responseData: any) {
    ctx.status = 403
    ctx.body = {
        status: 'fail',
        ...responseData
    }
}

