import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import db from './db/index.js';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/client/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    );
  } else {
    app.get('/', async (req, res) => {
      try { 
        const getUsers = await db.query("select * from users;")

        res.status(200).json({
            status: "success",
            results: getUsers.rows.length,
            data:{
                users: getUsers.rows,
            },
        });

      } catch(err) {
          console.log(err);
      }
      
        // res.send('API is running....');
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));