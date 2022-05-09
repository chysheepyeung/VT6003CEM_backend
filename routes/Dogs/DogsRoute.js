import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import { getAllDog, getOneDog, createDog, updateDog, deleteDog } from '../../controllers/Dog/DogsController.js'

const dogRouter = Router({ prefix: '/api/dogs' })

dogRouter.get('/', getAllDog);
dogRouter.get('/:id([0-9]{1,})', getOneDog);
dogRouter.post('/', bodyParser(), createDog);
dogRouter.post('/:id([0-9]{1,})', bodyParser(), updateDog);
dogRouter.delete('/:id([0-9]{1,})', deleteDog);

export default dogRouter;