import puppeteer from 'puppeteer';

export class HtmlService {
  static async htmlToImageBuffer(html: string, selector: string = 'body'): Promise<Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Đợi element xuất hiện
    await page.waitForSelector(selector);

    // Chụp đúng element
    const element = await page.$(selector);
    if (!element) {
      await browser.close();
      throw new Error(`Element with selector "${selector}" not found.`);
    }

    const uint8Array = await element.screenshot({ type: 'png' });

    await browser.close();
    return Buffer.from(uint8Array)
  }
}