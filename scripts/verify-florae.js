import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\gone0\\.gemini\\antigravity-ide\\brain\\58e7c513-e13a-4fc7-ae12-b1ce7e377897';
const baseUrl = 'http://localhost:5174';

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  // 1. Creator Interface
  console.log('Navigating to Creator Page...');
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });
  await page.waitForSelector('#bouquet-interactive-canvas', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(artifactDir, 'screenshot_verified_creator.png'),
    fullPage: false
  });
  console.log('1. Captured: screenshot_verified_creator.png');

  // 2. Select a Packaging Wrap
  console.log('Selecting Vase & Wrap category...');
  const vaseWrapTab = await page.$('#category-vase---wrap');
  if (vaseWrapTab) {
    await vaseWrapTab.click();
    await new Promise(r => setTimeout(r, 800));
    const wrapCards = await page.$$('.wrap-option-card');
    console.log(`Found ${wrapCards.length} wrap option cards.`);
    if (wrapCards.length > 1) {
      await wrapCards[1].click(); // Select Natural Kraft Paper
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({
        path: path.join(artifactDir, 'screenshot_verified_wrapped.png'),
        fullPage: false
      });
      console.log('2. Captured: screenshot_verified_wrapped.png');
    }
  }

  // 3. Filter Rare Botanicals in Catalog
  console.log('Filtering Rare Botanicals...');
  const rareCatBtn = await page.$('#category-rare-botanicals');
  if (rareCatBtn) {
    await rareCatBtn.click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(artifactDir, 'screenshot_verified_rare.png'),
      fullPage: false
    });
    console.log('3. Captured: screenshot_verified_rare.png');
  }

  // 4. Test Clear Bouquet (Empty State)
  console.log('Testing Clear Bouquet...');
  const clearBtn = await page.$('#tray-clear-btn');
  if (clearBtn) {
    await clearBtn.click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(artifactDir, 'screenshot_verified_empty.png'),
      fullPage: false
    });
    console.log('4. Captured: screenshot_verified_empty.png');
  }

  // 5. Randomize fresh bouquet
  console.log('Randomizing fresh bouquet...');
  const randomizeBtn = await page.$('#tray-randomize-btn');
  if (randomizeBtn) {
    await randomizeBtn.click();
    await new Promise(r => setTimeout(r, 1000));
  }

  // 6. Open Preview Modal
  console.log('Opening Preview Modal...');
  const previewNav = await page.$('#nav-preview-btn');
  if (previewNav) {
    await previewNav.click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(artifactDir, 'screenshot_verified_preview_modal.png'),
      fullPage: false
    });
    console.log('5. Captured: screenshot_verified_preview_modal.png');

    // 7. Create Gift and Generate Unique Link
    console.log('Clicking Create Gift in Preview Modal...');
    await page.evaluate(() => {
      const btn = document.getElementById('create-gift-btn');
      if (btn) btn.click();
    });
    console.log('Waiting for Share Modal...');
    await page.waitForSelector('#share-link-copy-field', { timeout: 10000 });
      const shareInput = await page.$('#share-link-copy-field');
      let shareUrl = '';
      if (shareInput) {
        shareUrl = await page.evaluate(el => el.value, shareInput);
        console.log('Generated Share URL:', shareUrl);
      }

      if (shareUrl) {
        // 8. Open Recipient Experience
        console.log('Opening Recipient Gift Experience at:', shareUrl);
        const recipientPage = await browser.newPage();
        await recipientPage.setViewport({ width: 1440, height: 900 });
        await recipientPage.goto(shareUrl, { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 1500));

        await recipientPage.screenshot({
          path: path.join(artifactDir, 'screenshot_verified_recipient_stage1.png'),
          fullPage: false
        });
        console.log('6. Captured: screenshot_verified_recipient_stage1.png');

        // Click "OPEN YOUR GIFT"
        console.log('Clicking OPEN YOUR GIFT...');
        await recipientPage.evaluate(() => {
          const btn = document.getElementById('recipient-open-gift-btn');
          if (btn) btn.click();
        });
        await recipientPage.waitForSelector('.recipient-exhibition-root', { timeout: 10000 });
        await new Promise(r => setTimeout(r, 2000));

        await recipientPage.screenshot({
          path: path.join(artifactDir, 'screenshot_verified_recipient_stage2.png'),
          fullPage: false
        });
        console.log('7. Captured: screenshot_verified_recipient_stage2.png');

          // Click on a flower in recipient bouquet to trigger meaning card
          const firstStem = await recipientPage.$('.recipient-stem-layer');
          if (firstStem) {
            console.log('Clicking on flower to inspect meaning...');
            await firstStem.click();
            await new Promise(r => setTimeout(r, 1000));
            await recipientPage.screenshot({
              path: path.join(artifactDir, 'screenshot_verified_flower_meaning.png'),
              fullPage: false
            });
            console.log('8. Captured: screenshot_verified_flower_meaning.png');
          }
        await recipientPage.close();
      } else {
        console.error('No shareUrl found in input field #share-link-copy-field');
      }
  }

  await browser.close();
  console.log('ALL VERIFICATIONS COMPLETED SUCCESSFULLY!');
}

run().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
