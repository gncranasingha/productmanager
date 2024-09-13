const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new order
router.post('/', async (req, res) => {
    try {
        const { productId, userId, quantity,orderDate } = req.body;
        const newOrder = await Order.create({ productId, userId, quantity,orderDate });
        res.status(201).json(newOrder);
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ error: err.message });
    }
});

// Update order by ID
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.update(req.body, {
            where: { id: req.params.id }
        });
        if (order[0] === 1) {
            res.json({ message: 'Order updated successfully' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating order' });
    }
});

// Delete an order
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        await order.destroy();
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
