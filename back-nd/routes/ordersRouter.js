import express from 'express';
const ordersRouter = express.Router();
import { protect, admin } from '../middlewares/protectUsers.js'

import { addNewOrder, getOrderById, updateOrderToPaid, myOrders, odersList } from '../controllers/orders.js';

ordersRouter.post('/', protect, addNewOrder);
ordersRouter.get('/myorders', protect, myOrders);
ordersRouter.get('/orderslist', protect, admin, odersList);
ordersRouter.get('/:id', protect, getOrderById);
ordersRouter.put('/:id/payment', protect, updateOrderToPaid);


export default ordersRouter