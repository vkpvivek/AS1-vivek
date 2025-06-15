require('dotenv').config();
const { createClient } = require('redis');
const { RateLimiterRedis } = require('rate-limiter-flexible');



// const redisClient = createClient({
//   socket: {
//     host: '127.0.0.1',
//     port: 6379,
//   },
// });

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379', 
});


redisClient.on('error', (err) => {
  console.error('❌ Redis Client Error', err);
});



(async () => {
  try {
    await redisClient.connect();
    console.log('✅ Redis connected');
  } catch (err) {
    console.error('❌ Redis connection failed:', err);
  }
})();



const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 10, 
  duration: 60,
});



const rateLimiterMiddleware = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes) {
    res.status(429).json({
      message: 'Too many requests, please try again later.',
    });
  }
};



module.exports = rateLimiterMiddleware;
