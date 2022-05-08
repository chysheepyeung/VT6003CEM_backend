import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser'
import userRouter from './routes/Accounts/UsersRoute.js'


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

const port = process.env.PORT || 10888;

app.listen(port, () => {
    console.log(`sever at http://localhost:${port}`);
})