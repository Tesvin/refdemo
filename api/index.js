import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
//import connectMongodb from './database/connectMongodb.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js'
import transactionRouth from './routes/transactionRouth.js'
//import calculateShares from './routes/shares.route.js'
import cors from 'cors';
import path from 'path';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
dotenv.config();


mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB!');
})
.catch((err) => {
    console.log(err);
});

const __dirname = path.resolve();

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`server connected to https://localhost:${port}`)
})

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/transaction', transactionRouth);
//app.use('api/shares', calculateShares);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

  
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
