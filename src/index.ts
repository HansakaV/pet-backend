import  express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
import { connectDB } from './db/mongo';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rootRouter from './routes/index';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:5173', 
    METHODS: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use(errorHandler)
app.use('/api', rootRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

