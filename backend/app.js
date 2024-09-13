const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/database');

app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);


app.listen(5000, () => {
    console.log('Server running on port 5000');
});
