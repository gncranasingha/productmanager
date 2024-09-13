const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const { log } = require('console');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;
        
        const newProduct = await Product.create({ name, description, price, quantity });
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error adding product:', err);  // Log the error for more information
        res.status(500).json({ error: err.message });
    }
});

// Update a product
router.put('/:id', async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.update({ name, description, price, quantity });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.destroy();
        res.json({ message: 'Product deleted' });
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
