import express from 'express';
import dotenv from 'dotenv';
import path from 'path'
import productsRouter from './routes/productsRouter.js';
import usersRouter from './routes/usersRouter.js';
import ordersRouter from './routes/ordersRouter.js';
import connectDB from './config/db.js';
import uploadRouter from './routes/uploadRouter.js'

// Express
const app = express();

// Dotenv
dotenv.config();

// MongoDB
connectDB();

// body parser
app.use(express.json());

// Route middlewares
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/upload', uploadRouter);

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// Server Running
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app is running on port ${port}`));