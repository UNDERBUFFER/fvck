import defaultRouter from "./default"
import authRouter from "./auth"
import Router from "koa-router"


const routers: Router[] = [
    defaultRouter,
    authRouter
]

const router = new Router()

router.use(...(routers.map( router => router.routes() )))

export default router

