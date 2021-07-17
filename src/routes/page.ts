import { AddPageController, EditPageController, DeletePageController } from "../controllers/page"
import { loginRequired } from "../utils/auth"
import Router from "koa-router"


const addController = new AddPageController()
const editController = new EditPageController()
const deleteController = new DeletePageController()
const router = new Router()


router.get('/page/add/', loginRequired, addController.get)
router.post('/page/add/', loginRequired, addController.post)

router.get('/page/edit/:pageId/', loginRequired, editController.get)
router.post('/page/edit/:pageId/', loginRequired, editController.post)

router.post('/page/delete/:pageId/', loginRequired, deleteController.post)


export default router
