import Controller from '../controllers/default'
import Router from "koa-router"


const controller = new Controller()
const router = new Router()


router.get('/', controller.get)


export default router

