const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectdb = require('./config/db');

const authroutes = require('./routes/authRoutes');
const productroute = require('./routes/productroutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
const app = express();

connectdb();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authroutes);
app.use('/api/pro', productroute);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('API is working');
});

const port = process.env.PORT || 5600;
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
