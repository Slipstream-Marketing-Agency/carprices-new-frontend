const express = require('express');
const next = require('next');
const path = require('path');
const { NextRequest, NextResponse } = require('next/server');
const { middleware } = require('./src/middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Serve static files with caching
  server.use((req, res, next) => {
    if (req.url.startsWith('/_next/static') || req.url.startsWith('/public/assets') || req.url.startsWith('/public')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    next();
  });

  server.use(express.static(path.join(__dirname, 'public')));

  // Custom middleware handling
  server.use(async (req, res, next) => {
    try {
      console.log(`Custom middleware triggered for: ${req.url}`);
      const nextReq = new NextRequest(`http://${req.headers.host}${req.url}`, {
        headers: req.headers,
        method: req.method,
        body: req.body,
      });

      const response = await middleware(nextReq);

      if (response && response.status !== 200) {
        console.log(`Middleware response status: ${response.status}`);
        response.headers.forEach((value, name) => {
          res.setHeader(name, value);
        });

        if (response.body) {
          const body = await response.text();
          res.status(response.status).send(body);
        } else {
          res.status(response.status).end();
        }
      } else {
        next();
      }
    } catch (error) {
      console.error('Error in custom middleware:', error);
      next();
    }
  });

  // Handle all other requests through Next.js
  server.all('*', (req, res) => {
    console.log(`Handling request for: ${req.url}`);
    return handle(req, res);
  });

  // Error handling middleware
  server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
