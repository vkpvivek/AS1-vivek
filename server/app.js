const express = require('express');
const cors = require('cors');
const rateLimiterMiddleware = require('./middlewares/rateLimiter');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use( rateLimiterMiddleware ); 

//routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.json({message:"sucessful"});
});

module.exports = app;
