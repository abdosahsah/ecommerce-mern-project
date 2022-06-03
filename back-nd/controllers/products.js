import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

export const getProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find({});

    res.status(200).json(products)
})

export const getProductById = asyncHandler(async (req, res, next) => {

    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)

        
    } catch (error) {
        res.status(404).json({ msg: 'Product not found', err: error.message })
        
    }
})

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.status(200).json({ message: 'Product removed' })
    }
    else{
        res.status(400).json({ message: 'Product not found!' })
    }
})

export const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        user: req.user._id,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        numReviews: req.body.numReviews,
        description : req.body.description
    })

    const newProduct = await product.save()

    if (newProduct) {
        res.status(200).json(newProduct)
    }
    else{
        res.status(400).json({ message: 'Product not created' })
    }
})

export const updateProduct = asyncHandler(async (req, res) => {

    const { name, price, image, brand, cetegory, countInStock, description } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.image = image    
        product.brand = brand
        product.cetegory = cetegory
        product.countInStock = countInStock
        product.description = description

        const updateProduct = await product.save()

        res.status(200).json(updateProduct)
    }
    else{
        res.status(400).json({ message: 'Product not updated!' })   
    }

})