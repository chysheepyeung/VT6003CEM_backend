import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import { getAllDog, getOneDog, createDog, updateDog, deleteDog } from '../../controllers/Dog/DogsController.js'
import { isAdmin, isAuth } from '../../utils.js';

const dogRouter = Router({ prefix: '/api/dogs' })

dogRouter.get('/', getAllDog);
dogRouter.get('/:id', getOneDog);
dogRouter.post('/', bodyParser(), createDog);
dogRouter.post('/:id', bodyParser(), updateDog);
dogRouter.delete('/:id', isAuth, isAdmin, deleteDog);

export default dogRouter;