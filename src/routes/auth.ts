import { RegistrationController, LoginController } from "../controllers/auth"
import Router from "koa-router"


const regController = new RegistrationController()
const logController = new LoginController()
const router = new Router()


router.get('/auth/registration/', regController.get)
router.post('/auth/registration/', regController.post)

router.get('/auth/login/', logController.get)
router.post('/auth/login/', logController.post)


export default router

