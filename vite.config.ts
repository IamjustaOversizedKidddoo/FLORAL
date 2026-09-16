import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.resolve(__dirname, 'data');
const GIFTS_FILE = path.resolve(DATA_DIR, 'gifts.json');

function ensureGiftsFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(GIFTS_FILE)) {
    fs.writeFileSync(GIFTS_FILE, JSON.stringify({}), 'utf-8');
  }
}

function readGifts(): Record<string, any> {
  ensureGiftsFile();
  try {
    const content = fs.readFileSync(GIFTS_FILE, 'utf-8');
    return JSON.parse(content || '{}');
  } catch {
    return {};
  }
}

function writeGifts(gifts: Record<string, any>) {
  ensureGiftsFile();
  fs.writeFileSync(GIFTS_FILE, JSON.stringify(gifts, null, 2), 'utf-8');
}

function generateGiftId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
  let id = '';
  const bytes = crypto.randomBytes(8);
  for (let i = 0; i < 8; i++) {
    id += chars[bytes[i] % chars.length];
  }
  return id;
}

function giftsApiPlugin(): Plugin {
  const handleApi = (req: any, res: any, next: any) => {
    const url = req.url || '';
    if (!url.startsWith('/api/gifts')) {
      return next();
    }

    res.setHeader('Content-Type', 'application/json');

    // POST /api/gifts (Create / Save a gift)
    if (req.method === 'POST' && (url === '/api/gifts' || url === '/api/gifts/')) {
      let body = '';
      req.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          const gifts = readGifts();
          
          // Generate unique, non-sequential URL-safe ID
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
              recipient: 'Dear ...,',
              body: 'Write your heart here...',
              closing: '— Yours always,',
              formatting: { font: 'Cormorant Garamond', tone: 'Poetic', bold: false, italic: true, underline: false, align: 'left' }
            }
          };

          gifts[giftId] = giftRecord;
          writeGifts(gifts);

          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, giftId, shareUrl: `/g/${giftId}`, gift: giftRecord }));
        } catch (err: any) {
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload: ' + err.message }));
        }
      });
      return;
    }

    // GET /api/gifts/:giftId (Fetch gift by ID)
    if (req.method === 'GET' && url.startsWith('/api/gifts/')) {
      const parts = url.split('/');
      const giftId = parts[3]?.split('?')[0];

      if (!giftId) {
        res.statusCode = 400;
        res.end(JSON.stringify({ success: false, error: 'Missing gift ID' }));
        return;
      }

      const gifts = readGifts();
      const gift = gifts[giftId];

      if (!gift) {
        res.statusCode = 404;
        res.end(JSON.stringify({ success: false, error: 'Gift not found' }));
        return;
      }

      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, gift }));
      return;
    }

    return next();
  };

  return {
    name: 'gifts-api-middleware',
    configureServer(server) {
      server.middlewares.use(handleApi);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleApi);
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), giftsApiPlugin()],
  server: {
    port: 5173,
    host: true,
  },
});
