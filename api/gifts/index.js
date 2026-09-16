import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const TMP_FILE = '/tmp/gifts.json';
const SEED_FILE = path.resolve(process.cwd(), 'data/gifts.json');

function readGifts() {
  try {
    if (fs.existsSync(TMP_FILE)) {
      return JSON.parse(fs.readFileSync(TMP_FILE, 'utf-8') || '{}');
    }
    if (fs.existsSync(SEED_FILE)) {
      const seed = JSON.parse(fs.readFileSync(SEED_FILE, 'utf-8') || '{}');
      try { fs.writeFileSync(TMP_FILE, JSON.stringify(seed)); } catch {}
      return seed;
    }
  } catch (err) {
    console.error('Error reading gifts:', err);
  }
  return {};
}

function writeGifts(gifts) {
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(gifts, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to /tmp:', err);
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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'POST') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
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
        bouquet: payload.bouquet || { items: [], vaseId: 'vase-dark-ceramic', wrapId: 'wrap-none' },
        letter: payload.letter || {
          templateId: 'classic',
          recipient: 'Dear Someone,',
          body: 'Thinking of you with this bouquet.',
          closing: '— Yours always,',
          formatting: { font: 'Cormorant Garamond', tone: 'Poetic', bold: false, italic: true, underline: false, align: 'left' }
        }
      };

      gifts[giftId] = giftRecord;
      writeGifts(gifts);

      return res.status(200).json({
        success: true,
        giftId,
        shareUrl: `/g/${giftId}`,
        gift: giftRecord
      });
    } catch (err) {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }
  }

  if (req.method === 'GET') {
    const gifts = readGifts();
    return res.status(200).json({ success: true, count: Object.keys(gifts).length, gifts });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
