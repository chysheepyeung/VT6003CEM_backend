import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import { chkFav, createFav, deleteFav, getAllFav } from '../../controllers/Favourite/FavouriteController.js';
import { isAuth } from '../../utils.js';

const favRouter = Router({ prefix: '/api/fav' })

favRouter.get('/', isAuth, getAllFav);
favRouter.get('/:id', isAuth, chkFav)
favRouter.post('/', bodyParser(), isAuth, createFav);
favRouter.delete('/:id', isAuth, deleteFav);

export default favRouter;