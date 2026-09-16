import { BouquetInstance } from '../types/bouquet';
import { LetterFormatting, TemplateId } from '../types/letter';

export interface SharedGiftData {
  giftId: string;
  createdAt: string;
  updatedAt: string;
  bouquet: {
    items: BouquetInstance[];
    vaseId: string;
    wrapId: string;
  };
  letter: {
    templateId: TemplateId;
    recipient: string;
    body: string;
    closing: string;
    formatting: LetterFormatting;
  };
}

const LOCAL_GIFTS_KEY = 'florae_shared_gifts_v1';

function getLocalGifts(): Record<string, SharedGiftData> {
  try {
    const raw = localStorage.getItem(LOCAL_GIFTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function getAppOrigin(): string {
  const envUrl = import.meta.env.VITE_PUBLIC_APP_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return window.location.origin.replace(/\/$/, '');
  }
  return '';
}

function saveLocalGift(gift: SharedGiftData) {
  try {
    const gifts = getLocalGifts();
    gifts[gift.giftId] = gift;
    localStorage.setItem(LOCAL_GIFTS_KEY, JSON.stringify(gifts));
  } catch {
    // ignore
  }
}

// Basic text sanitization for security
function sanitizeText(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
}

export async function createSharedGift(creation: {
  bouquet: {
    items: BouquetInstance[];
    vaseId: string;
    wrapId: string;
  };
  letter: {
    templateId: TemplateId;
    recipient: string;
    body: string;
    closing: string;
    formatting: LetterFormatting;
  };
  giftId?: string;
}): Promise<{ success: boolean; giftId: string; shareUrl: string; gift: SharedGiftData }> {
  // Sanitize letter contents
  const sanitizedPayload = {
    ...creation,
    letter: {
      ...creation.letter,
      recipient: sanitizeText(creation.letter.recipient),
      body: sanitizeText(creation.letter.body),
      closing: sanitizeText(creation.letter.closing)
    }
  };

  try {
    const res = await fetch('/api/gifts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedPayload)
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.gift) {
        saveLocalGift(data.gift);
        const shareUrl = `${getAppOrigin()}/g/${data.giftId}`;
        return { success: true, giftId: data.giftId, shareUrl, gift: data.gift };
      }
    }
  } catch (err) {
    console.warn('API error, falling back to local storage', err);
  }

  // Fallback: Generate local gift
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
  let fallbackId = creation.giftId || '';
  if (!fallbackId) {
    for (let i = 0; i < 8; i++) {
      fallbackId += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  const now = new Date().toISOString();
  const giftRecord: SharedGiftData = {
    giftId: fallbackId,
    createdAt: now,
    updatedAt: now,
    bouquet: sanitizedPayload.bouquet,
    letter: sanitizedPayload.letter
  };

  saveLocalGift(giftRecord);
  const shareUrl = `${getAppOrigin()}/g/${fallbackId}`;
  return { success: true, giftId: fallbackId, shareUrl, gift: giftRecord };
}

export async function fetchSharedGift(giftId: string): Promise<SharedGiftData | null> {
  if (!giftId || typeof giftId !== 'string') return null;

  try {
    const res = await fetch(`/api/gifts/${encodeURIComponent(giftId)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.gift) {
        saveLocalGift(data.gift);
        return data.gift;
      }
    }
  } catch (err) {
    console.warn('API fetch error, checking local storage', err);
  }

  // Fallback to local storage
  const localGifts = getLocalGifts();
  return localGifts[giftId] || null;
}
