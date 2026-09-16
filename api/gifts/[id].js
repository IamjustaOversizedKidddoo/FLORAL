import fs from 'fs';
import path from 'path';

const TMP_FILE = '/tmp/gifts.json';
const SEED_FILE = path.resolve(process.cwd(), 'data/gifts.json');

function readGifts() {
  try {
    if (fs.existsSync(TMP_FILE)) {
      return JSON.parse(fs.readFileSync(TMP_FILE, 'utf-8') || '{}');
    }
    if (fs.existsSync(SEED_FILE)) {
      return JSON.parse(fs.readFileSync(SEED_FILE, 'utf-8') || '{}');
    }
  } catch (err) {
    console.error('Error reading gifts:', err);
  }
  return {};
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Gift ID is required' });
  }

  const gifts = readGifts();
  const gift = gifts[id];

  if (!gift) {
    return res.status(404).json({ error: 'Gift not found' });
  }

  return res.status(200).json({ success: true, gift });
}
