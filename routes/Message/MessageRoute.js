import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import { createMsg, deleteMsg, getAllMsg } from '../../controllers/Message/MessageController.js';
import { isAuth } from '../../utils.js';

const msgRouter = Router({ prefix: '/api/message' })

msgRouter.get('/', isAuth, getAllMsg);
msgRouter.post('/:type', bodyParser(), isAuth, createMsg);
msgRouter.delete('/:id', isAuth, deleteMsg);

export default msgRouter;