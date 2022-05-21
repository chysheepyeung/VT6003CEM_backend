import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import { register, login } from '../../controllers/Account/UsersController.js'


const userRouter = Router({ prefix: '/api' })

// userRouter.get('/user', getAllUsers);
userRouter.post('/register', bodyParser(), register);
userRouter.post('/login', bodyParser(), login);
// userRouter.get('/user/:id([0-9]{1,})', isAuth, getOneUser);
// userRouter.post('/user/:id([0-9]{1,})', bodyParser(), isAuth, updateUser);
// userRouter.delete('/user/:id([0-9]{1,})', isAuth, deleteUser);

export default userRouter;