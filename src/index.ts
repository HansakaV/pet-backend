import  express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
import { connectDB } from './db/mongo';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rootRouter from './routes/index';

dotenv.config();
const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
    
const corsOptions = {
    origin: 'http://localhost:5173', 
    METHODS: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']        
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api', rootRouter);
app.use(errorHandler)


connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT} and accessible on all interfaces`);
});
});

