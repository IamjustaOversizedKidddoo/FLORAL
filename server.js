/**
 * FLORÆ Production Server
 * 
 * Standalone, zero-dependency Node.js HTTP server.
 * Serves compiled production assets from ./dist with SPA fallback
 * and provides the persistent /api/gifts storage engine.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '5174', 10);
const DATA_DIR = path.resolve(__dirname, process.env.DATA_DIR || 'data');
const GIFTS_FILE = path.resolve(DATA_DIR, 'gifts.json');
const DIST_DIR = path.resolve(__dirname, 'dist');

// Ensure data storage directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(GIFTS_FILE)) {
  fs.writeFileSync(GIFTS_FILE, JSON.stringify({}, null, 2), 'utf-8');
}

function readGifts() {
  try {
    const content = fs.readFileSync(GIFTS_FILE, 'utf-8');
    return JSON.parse(content || '{}');
  } catch (err) {
    console.error('Error reading gifts:', err);
    return {};
  }
}

function writeGifts(gifts) {
  try {
    fs.writeFileSync(GIFTS_FILE, JSON.stringify(gifts, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing gifts:', err);
  }
}

function generateGiftId() {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
  let id = '';
  const bytes = crypto.randomBytes(8);
  for (let i = 0; i < 8; i++) {
    id += chars[bytes[i] % chars.length];
  }
  return id;
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // API ROUTE: /api/gifts
  if (pathname.startsWith('/api/gifts')) {
    res.setHeader('Content-Type', 'application/json');

    // POST /api/gifts
    if (req.method === 'POST' && (pathname === '/api/gifts' || pathname === '/api/gifts/')) {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          const gifts = readGifts();

          let giftId = payload.giftId || generateGiftId();
          while (gifts[giftId] && !payload.giftId) {
            giftId = generateGiftId();
          }

          const now = new Date().toISOString();
          const giftRecord = {
            giftId,
            createdAt: gifts[giftId]?.createdAt || now,
            updatedAt: now,
            bouquet: payload.bouquet || { items: [], vaseId: 'vase-kintsugi', wrapId: 'wrap-none' },
            letter: payload.letter || {
              templateId: 'classic',
              recipient: '',
              body: '',
              closing: '',
              formatting: { font: 'Cormorant Garamond', tone: 'Poetic', bold: false, italic: true, underline: false, align: 'left' }
            }
          };

          gifts[giftId] = giftRecord;
          writeGifts(gifts);

          res.statusCode = 200;
          res.end(JSON.stringify({
            success: true,
            giftId,
            shareUrl: `/g/${giftId}`,
            gift: giftRecord
          }));
        } catch (err) {
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, error: 'Invalid payload: ' + err.message }));
        }
      });
      return;
    }

    // GET /api/gifts/:giftId
    if (req.method === 'GET' && pathname.startsWith('/api/gifts/')) {
      const parts = pathname.split('/').filter(Boolean);
      const giftId = parts[parts.length - 1];
      const gifts = readGifts();

      if (gifts[giftId]) {
        res.statusCode = 200;
        res.end(JSON.stringify({ success: true, gift: gifts[giftId] }));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ success: false, error: 'Gift not found' }));
      }
      return;
    }
  }

  // STATIC ASSETS & SPA ROUTING
  let filePath = path.join(DIST_DIR, pathname);

  // Security: prevent directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  // If path is a directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // If file exists, serve it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // SPA Fallback: Serve dist/index.html for client-side routes (e.g. /g/:giftId)
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    fs.createReadStream(indexPath).pipe(res);
  } else {
    res.statusCode = 404;
    res.end('Production build not found. Please run "npm run build" first.');
  }
});

server.listen(PORT, () => {
  console.log(`🌸 FLORÆ Atelier Production Server running on http://localhost:${PORT}`);
});
