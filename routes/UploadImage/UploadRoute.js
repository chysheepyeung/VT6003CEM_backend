import Router from 'koa-router';
import { isAdmin, isAuth, upload } from '../../utils.js';

const uploadRouter = Router({ prefix: '/api' })

uploadRouter.post('/image', isAuth, isAdmin, upload.single('pic'), async (ctx) => {
    const file = ctx.req.file
    ctx.body = { fullPath: 'http://' + ctx.req.headers.host + '/' + file.destination + file.filename };
})


export default uploadRouter;