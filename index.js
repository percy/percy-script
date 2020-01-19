const puppeteer = require("puppeteer");
const platform = require("os").platform();
const isWindows = /^win/.test(platform);
const percySnapshot = require("./snapshot.js");

const defaultOptions = {
  headless: true,
  args: isWindows
    ? []
    : ["--no-sandbox", "--disable-setuid-sandbox", "--single-process"]
};

const PercyScript = {
  async run(runFn, options = {}) {
    const browser = await puppeteer.launch({
      ...defaultOptions,
      ...options
    });

    const page = await browser.newPage();

    async function snapshot(name, options) {
      await percySnapshot(page, name, options);
    }

    try {
      await runFn(page, snapshot);
    } finally {
      await browser.close();
    }
  }
};

module.exports = PercyScript;
