const baseUrl = 'http://localhost:5174';

async function verifyMultiGift() {
  console.log('Testing Multi-Gift Isolation & Storage...');

  // Gift 1: Rose & Lavender in Dark Fluted Ceramic
  const gift1Payload = {
    bouquet: {
      items: [
        { instanceId: 'g1-stem-1', botanicalId: 'flower-rose', name: 'Rose', image: '/assets/flowers/rose.png', category: 'FLOWERS', x: 50, y: 52, scale: 1.1, rotation: 0, zIndex: 10, flipX: false }
      ],
      vaseId: 'vase-dark-ceramic',
      wrapId: 'wrap-none'
    },
    letter: {
      templateId: 'classic',
      recipient: 'Dear Alice,',
      body: 'Happy Anniversary my love.',
      closing: '— Forever yours, Bob',
      formatting: { font: 'Cormorant Garamond', tone: 'Poetic', bold: false, italic: true, underline: false, align: 'left' }
    }
  };

  // Gift 2: Orchid & Jade Vine in Charcoal French Linen Wrap
  const gift2Payload = {
    bouquet: {
      items: [
        { instanceId: 'g2-stem-1', botanicalId: 'flower-ghost-orchid', name: 'Ghost Orchid', image: '/assets/flowers/ghost-orchid.png', category: 'RARE BOTANICALS', x: 48, y: 46, scale: 1.15, rotation: -4, zIndex: 8, flipX: false },
        { instanceId: 'g2-stem-2', botanicalId: 'flower-jade-vine', name: 'Jade Vine', image: '/assets/flowers/jade-vine.png', category: 'RARE BOTANICALS', x: 54, y: 50, scale: 1.05, rotation: 8, zIndex: 12, flipX: false }
      ],
      vaseId: 'vase-dark-ceramic',
      wrapId: 'wrap-charcoal'
    },
    letter: {
      templateId: 'botanical',
      recipient: 'Dear Clara,',
      body: 'May peace and joy fill your new home.',
      closing: '— With admiration, David',
      formatting: { font: 'Cinzel', tone: 'Refined', bold: false, italic: false, underline: false, align: 'center' }
    }
  };

  const res1 = await fetch(`${baseUrl}/api/gifts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gift1Payload)
  });
  const data1 = await res1.json();
  console.log(`Created Gift 1: ID = ${data1.giftId}`);

  const res2 = await fetch(`${baseUrl}/api/gifts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gift2Payload)
  });
  const data2 = await res2.json();
  console.log(`Created Gift 2: ID = ${data2.giftId}`);

  if (data1.giftId === data2.giftId) {
    throw new Error('Gift IDs must be distinct!');
  }

  // Fetch Gift 1
  const get1 = await fetch(`${baseUrl}/api/gifts/${data1.giftId}`);
  const fetched1 = await get1.json();
  if (fetched1.gift.letter.recipient !== 'Dear Alice,') {
    throw new Error(`Gift 1 corrupted! Expected "Dear Alice," but got "${fetched1.gift.letter.recipient}"`);
  }
  if (fetched1.gift.bouquet.wrapId !== 'wrap-none') {
    throw new Error(`Gift 1 wrap corrupted!`);
  }

  // Fetch Gift 2
  const get2 = await fetch(`${baseUrl}/api/gifts/${data2.giftId}`);
  const fetched2 = await get2.json();
  if (fetched2.gift.letter.recipient !== 'Dear Clara,') {
    throw new Error(`Gift 2 corrupted! Expected "Dear Clara," but got "${fetched2.gift.letter.recipient}"`);
  }
  if (fetched2.gift.bouquet.wrapId !== 'wrap-charcoal') {
    throw new Error(`Gift 2 wrap corrupted!`);
  }
  if (fetched2.gift.bouquet.items.length !== 2) {
    throw new Error(`Gift 2 stem count corrupted!`);
  }

  console.log('✓ Multi-gift isolation verified: Gift 1 and Gift 2 are completely independent and preserved!');
}

verifyMultiGift().catch(err => {
  console.error('Multi-gift test failed:', err);
  process.exit(1);
});
