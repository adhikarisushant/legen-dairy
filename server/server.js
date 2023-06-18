import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import db from './db/index.js';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));