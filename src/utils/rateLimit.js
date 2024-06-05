// utils/rateLimit.js
const rateLimit = (fn, limit) => {
    let requestTimes = {};
  
    return (req, res) => {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const now = Date.now();
  
      if (!requestTimes[ip]) {
        requestTimes[ip] = [];
      }
  
      // Filter out timestamps older than the limit window
      requestTimes[ip] = requestTimes[ip].filter(time => now - time < limit);
  
      if (requestTimes[ip].length >= 5) {
        res.status(429).json({ message: 'Too many requests' });
      } else {
        requestTimes[ip].push(now);
        fn(req, res);
      }
    };
  };
  
  export default rateLimit;
  