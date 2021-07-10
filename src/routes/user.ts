import { UserController, FriendsController, PagesController, AddFriendshipController, DeleteFriendshipController } from "../controllers/user"
import Router from "koa-router"
import { loginRequired } from "../utils/auth"


const userController = new UserController()
const friendsController = new FriendsController()
const pagesController = new PagesController()
const addShipController = new AddFriendshipController()
const deleteShipController = new DeleteFriendshipController
const router = new Router()


router.get('/user/', loginRequired, userController.get)
router.post('/user/', loginRequired, userController.post)

router.get('/user/:nickname/', loginRequired, userController.get)
router.post('/user/:nickname/', loginRequired, userController.post)

router.get('/user/:nickname/friends/', friendsController.get)
router.get('/user/:nickname/pages/', pagesController.get)

router.post('/user/:nickname/add-friendship/', addShipController.post)
router.post('/user/:nickname/delete-friendship/', deleteShipController.post)


export default router

