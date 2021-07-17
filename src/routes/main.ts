import defaultRouter from "./default"
import authRouter from "./auth"
import userRouter from "./user"
import pageRouter from "./page"
import Router from "koa-router"


const routers: Router[] = [
    defaultRouter,
    authRouter,
    userRouter,
    pageRouter
]

const router = new Router({
    prefix: '/api'
})

router.use(...(routers.map( router => router.routes() )))


export default router

