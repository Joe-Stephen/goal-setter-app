const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./userSide/middlewares/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//setting default routes
app.use('/api/goals', require('./userSide/routes/goalRoutes'));
app.use('/api/users', require('./userSide/routes/userRoutes'));

app.use('/api/admin', require('./adminSide/routes/adminRoutes'));

app.use(errorHandler);

app.listen(port,()=>console.log(`Server is up and running on port ${port}`));