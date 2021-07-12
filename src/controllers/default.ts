import { response200 } from "../utils/response"
import { Context } from "koa"


export default class HelloWorldController {
    get(ctx: Context) {
        response200(ctx, {
            detail: 'Hello, World!'
        })
    }
}

