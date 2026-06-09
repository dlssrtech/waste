const assert = require('assert');
const { createServer } = require('../src/server');

const PANEL_ROUTES = [
  '/',
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
  '/customer-support',
  '/styles.css',
  '/app.js'
];

function request(port, pathname) {
  return new Promise((resolve, reject) => {
    const req = fetch(`http://127.0.0.1:${port}${pathname}`);
    req.then(resolve).catch(reject);
  });
}

async function main() {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  try {
    for (const route of PANEL_ROUTES) {
      const response = await request(port, route);
      assert.strictEqual(response.status, 200, `${route} should return HTTP 200`);
      const body = await response.text();
      assert(body.length > 100, `${route} should return page or asset content`);
    }

    const missing = await request(port, '/missing-panel');
    assert.strictEqual(missing.status, 404, 'unknown panel should return HTTP 404');
    console.log(`Verified ${PANEL_ROUTES.length} panel routes and assets.`);
  } finally {
    server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
