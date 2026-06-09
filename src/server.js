const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 3000);
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8'
};

function send(res, statusCode, body, contentType = 'text/plain; charset=utf-8') {
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function serveStatic(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === '/' || isPanelRoute(pathname)) {
    pathname = '/index.html';
  }

  const filePath = path.normalize(path.join(PUBLIC_DIR, pathname));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    send(res, 403, 'Forbidden');
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      send(res, 404, 'Not found');
      return;
    }

    const ext = path.extname(filePath);
    send(res, 200, content, MIME_TYPES[ext] || 'application/octet-stream');
  });
}

function isPanelRoute(pathname) {
  return [
    '/super-admin',
    '/country-admin',
    '/dispatcher',
    '/collector-management',
    '/pickup-management',
    '/sack-inventory',
    '/payments-wallets',
    '/special-pickups',
    '/photo-proof',
    '/reports-analytics',
    '/customer-support'
  ].includes(pathname);
}

function createServer() {
  return http.createServer((req, res) => {
    if (req.method !== 'GET') {
      send(res, 405, 'Method not allowed');
      return;
    }

    serveStatic(req, res);
  });
}

if (require.main === module) {
  createServer().listen(PORT, () => {
    console.log(`Waste operations dashboard running at http://localhost:${PORT}`);
  });
}

module.exports = { createServer, isPanelRoute };
