import express from 'express';
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import dotenv from 'dotenv';
dotenv.config();

import { errorHandler } from './middlewares/errorHandler';
import { connectDB } from './db/mongo';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from './config/passport';
import rootRouter from './routes/index';
const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

    
const corsOptions = {
    origin: (origin: any, callback: any) => {
        const allowedOrigins = [process.env.ORIGIN, "http://localhost:5173"];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Debug logging for requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api', rootRouter);
app.use(errorHandler)


connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT} and accessible on all interfaces`);
});
});

