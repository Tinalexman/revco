import { NextResponse } from "next/server";
import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer";

export async function GET() {
  const executablePath = await chrome.executablePath;

  const browser = await puppeteer.launch({
    executablePath: executablePath || undefined,
    args: chrome.args,
    headless: chrome.headless,
  });

  const page = await browser.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="document.pdf"',
    },
  });
}
