import { Context } from "koa"


export default class HelloWorldController {
    get(ctx: Context) {
        ctx.body = {
            detail: 'Hello, World!'
        }
    }
}

