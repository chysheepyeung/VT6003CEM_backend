import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser'
import { fileURLToPath } from 'url';
import serve from 'koa-static'
import mount from 'koa-mount';
import path from 'path'
import Router from 'koa-router';
import userRouter from './routes/Accounts/UsersRoute.js'
import dogRouter from './routes/Dogs/DogsRoute.js';
import uploadRouter from './routes/UploadImage/UploadRoute.js'
import favRouter from './routes/Favourite/FavouriteRoute.js';


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

app.use(userRouter.routes());
app.use(dogRouter.routes());
app.use(uploadRouter.routes());
app.use(favRouter.routes());

app.use(mount('/public/images', serve('./public/images')));


const port = process.env.PORT || 10888;

app.listen(port, () => {
    console.log(`sever at http://localhost:${port}`);
})