const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => console.log('Connected to MongoDB')).catch(err => console.log('Error connecting to MongoDB', err));


app.use(express.json());

app.use('/', require('./routes/authRoutes'));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));