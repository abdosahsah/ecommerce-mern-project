import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';


export const addNewOrder = asyncHandler(async(req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice } = req.body

    if(orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' })
    }
    
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const newOrder = await order.save()

    res.status(200).json(newOrder)
})

export const getOrderById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.status(200).json(order)
    }
    else {
        res.status(400).json({ message: 'Order not found' })
    }
})

export const updateOrderToPaid = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }

        const updateOrder = await order.save()

        res.json(updateOrder)
    }

    else {
        res.status(400).json({ message: 'Order not found' })
    }
})

export const myOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({ user: req.user._id })

    if (orders) {
        res.status(200).json(orders)
    }
    else{
        res.status(400).json({ message: 'No order found' })
    }
})

export const odersList = asyncHandler(async (req, res) => {
    const orders = await Order.find({ }).populate('user', 'id email')

    if (orders) {
        res.status(200).json(orders)
    }
    else {
        res.status(400).json({ message: 'Orders not found!' })
    }
})