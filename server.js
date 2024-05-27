// server.js
const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Set Cache-Control headers for static assets
  server.use((req, res, next) => {
    if (req.url.startsWith('/_next/static') || req.url.startsWith('/public/assets') || req.url.startsWith('/public')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    next();
  });

  // Serve static files from /public directory
  server.use(express.static(path.join(__dirname, 'public')));

  // Handle all other requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
