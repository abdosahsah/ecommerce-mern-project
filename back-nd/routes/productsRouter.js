import express from 'express';
const productsRouter = express.Router();
import { protect, admin } from '../middlewares/protectUsers.js'
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct } from '../controllers/products.js';


productsRouter.get('/', getProducts);
productsRouter.post('/product', protect, admin, createProduct);
productsRouter.put('/product/:id', protect, admin, updateProduct);
productsRouter.delete('/product/:id', protect, admin, deleteProduct);
productsRouter.get('/:id', getProductById);


export default productsRouter