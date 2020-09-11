import {Router} from 'express'
import auth from './app/middlewares/Auth'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
const routes= Router()
routes.post('/login',SessionController.store)
routes.post('/users',UserController.store)
routes.use(auth)
routes.put('/users',UserController.update)
routes.post('/users/me',UserController.index)

export default routes