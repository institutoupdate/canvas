import express from "express";
import bodyParser from "body-parser";
import puppeteer from "puppeteer";
import crypto from "crypto";
import fs from "fs";
import Path from "path";
import { exec } from "./utils";

const PORT = process.env.PORT || 8000;

const VERSION =
  process.env.VERSION ||
  require(Path.resolve(__dirname, "../package.json")).version;
const FILES_DIR = Path.join(__dirname, "../files");
const FORMATS = ["A3", "A2", "A1"];
const MAP_FORMAT_SIZES = {
  A1: [841, 594],
  A2: [594, 420],
  A3: [420, 297],
  A4: [297, 210],
};
const URL = process.env.URL || `http://localhost:${PORT}`;

let puppeteerConfig = {
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
};

if (process.env.CHROME_PATH) {
  puppeteerConfig.executablePath = process.env.CHROME_PATH;
}

/*
 * First render
 */
if (!fs.existsSync(FILES_DIR)) {
  fs.mkdirSync(FILES_DIR);
}
setTimeout(async () => {
  for (const format of FORMATS) {
    await render(null, "default", format);
    await render("persona", null, format);
    await render("identidade", null, format);
  }
  console.log("Files generated");
}, 10000);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getCanvasPath = (name, format) => {
  return Path.join(FILES_DIR, `canvas-${name}-${format}.pdf`);
};

const render = async function (id, name, format) {
  const path = getCanvasPath(id || name, format);
  const pageUrl = id ? URL + "/" + id : URL;
  const browser = await puppeteer.launch(puppeteerConfig);
  const page = await browser.newPage();
  await page.goto(pageUrl);
  await page.pdf({
    path,
    format,
    scale: 1,
    landscape: true,
    printBackground: true,
  });
  await browser.close();
  await a4tile(id || name, path, format);
};

const a4tile = async function (id, path, format) {
  const output = Path.join(FILES_DIR, `canvas-${id}-${format}-A4.pdf`);
  let box = [1, 1];
  switch (format) {
    case "A1":
      box = [4, 2];
      break;
    case "A2":
      box = [2, 2];
      break;
    case "A3":
      box = [2, 1];
      break;
    default:
  }
  await exec(`pdfposter -mA4 -p${box[0]}x${box[1]}a4 ${path} ${output}`);
};

export default app;
