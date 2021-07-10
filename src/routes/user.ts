import { UserController, FriendsController, PagesController, AddFriendshipController, DeleteFriendshipController } from '../controllers/user'
import Router from "koa-router"


const userController = new UserController()
const friendsController = new FriendsController()
const pagesController = new PagesController()
const addShipController = new AddFriendshipController()
const deleteShipController = new DeleteFriendshipController
const router = new Router()

router.get('/user/:nickname/', userController.get)
router.post('/auth/registration/', userController.post)

router.get('/user/:nickname/friends/', friendsController.get)
router.get('/user/:nickname/pages/', pagesController.get)

router.get('/user/:nickname/friends/', friendsController.get)
router.get('/user/:nickname/pages/', pagesController.get)

router.get('/user/:nickname/add-friendship/', addShipController.post)
router.get('/user/:nickname/delete-friendship/', deleteShipController.post)


export default router

