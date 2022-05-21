import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from '@koa/cors';
import Koa from 'koa';
import serve from 'koa-static'
import mount from 'koa-mount';
import userRouter from './routes/Accounts/UsersRoute.js'
import dogRouter from './routes/Dogs/DogsRoute.js';
import uploadRouter from './routes/UploadImage/UploadRoute.js'
import favRouter from './routes/Favourite/FavouriteRoute.js';

import yamljs from 'yamljs';
import { koaSwagger } from 'koa2-swagger-ui';
import msgRouter from './routes/Message/MessageRoute.js';

const spec = yamljs.load("./api.yaml");

// import m2s from 'mongoose-to-swagger'
// import User from './model/Dog/DogsModel.js'
// const swaggerSchema = m2s(User);
// console.log(swaggerSchema);

dotenv.config();
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to db');
    })
    .catch((error) => {
        console.log(error.message);
    });


const corsOptions = {
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
}


const app = new Koa();
app.use(cors());
userRouter.get('/docs', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));
app.use(userRouter.routes());
app.use(dogRouter.routes());
app.use(uploadRouter.routes());
app.use(favRouter.routes());
app.use(msgRouter.routes());

app.use(mount('/public/images', serve('./public/images')));

const port = process.env.PORT || 10888;

app.listen(port, () => {
    console.log(`sever at http://localhost:${port}`);
})