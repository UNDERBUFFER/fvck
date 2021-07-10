import defaultRouter from "./default"
import authRouter from "./auth"
import userRouter from "./user"
import Router from "koa-router"


const routers: Router[] = [
    defaultRouter,
    authRouter,
    userRouter
]

const router = new Router()

router.use(...(routers.map( router => router.routes() )))


export default router

