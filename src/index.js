import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function renderSvg(code) {
  const browser = await puppeteer.launch({
    // headless: false // uncomment for debugging purposes
  });
  const page = await browser.newPage();
  await page.goto(`file://${path.join(__dirname, 'render.html')}`);
  const svg = await page.evaluate((html) => {
    // update DOM with mermaid diagram code
    const $container = document.querySelector('#container');
    $container.innerHTML = html;
    // run mermaid
    window.mermaid.init();
    // return the SVG
    return document.querySelector('#container svg').outerHTML;
  }, toHtml(code));
  return svg;
}

(async() => {
const svg = await renderSvg('graph TD;A-->B;A-->C;B-->D;C-->D;');
console.log(svg);
})();

function toHtml(code) {
  return '<div class="mermaid">\n' + code + '\n</div>\n';
}

export default function() {
  return {
    renderer: {
      code(code, infostring, escaped) {
        if (infostring === 'mermaid') {
          return toHtml(code);
        } else {
          return false;
        }
      }
    }
  };
}
