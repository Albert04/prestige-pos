// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const tableRoutes = require('./controllers/tableController');
const productsRouter = require('./controllers/ProductsController'); // Assuming controllers are in a separate folder
const customerRouter = require ('./controllers/CustomerController');
const orderRouter = require ('./controllers/OrderController');
const userRouter = require ('./controllers/UserController');
const categoryRouter = require ('./controllers/CategoryController');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:4200', 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/tables', tableRoutes);
app.use('/products', productsRouter);
app.use('/customers', customerRouter);
app.use('/orders', orderRouter);
app.use('/users', userRouter);
app.use('/category', categoryRouter)


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
