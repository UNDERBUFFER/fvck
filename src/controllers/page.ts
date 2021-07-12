import { Context } from "koa"


export class AddPageController {
    get(ctx: Context) {
        ctx.body = {
            detail: 'to be continued!'
        }
    }
    async post(ctx: Context) {
        ctx.body = {
            detail: 'to be continued!'
        }
    }
}


export class EditPageController {
    async get(ctx: Context) {
        ctx.body = {
            detail: 'to be continued!'
        }
    }
    async post(ctx: Context) {
        ctx.body = {
            detail: 'to be continued!'
        }
    }
}


export class DeletePageController {
    async post(ctx: Context) {
        ctx.body = {
            detail: 'to be continued!'
        }
    }
}

