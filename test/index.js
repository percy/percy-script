const PercyScript = require("../index.js");

PercyScript.run(async (page, percySnapshot) => {
  await page.setBypassCSP(true);
  await page.goto("https://sdk-test.percy.dev");
  await page.waitFor("#cors");
  await percySnapshot("Percy SDK test page");

  await page.goto("http://example.com/");
  await page.waitFor("h1");
  await percySnapshot("HTTP live site");
});

// With snapshot options
PercyScript.run(async (page, percySnapshot) => {
  let widths = [550, 780];

  await page.setBypassCSP(true);
  await page.goto("https://sdk-test.percy.dev");
  await page.waitFor("#cors");
  await percySnapshot("Percy SDK test page [with snapshot options]", {
    widths
  });

  await percySnapshot("Percy SDK test page [with percy CSS]", {
    percyCSS: `body { background-color: purple; }`
  });

  await page.goto("http://example.com/");
  await page.waitFor("h1");
  await percySnapshot("HTTP live site [with snapshot options]", { widths });
});

// With launcher options
const launcherOptions = {
  defaultViewport: {
    height: 900,
    width: 1280
  }
};

PercyScript.run(async (page, percySnapshot) => {
  await page.setBypassCSP(true);
  await page.goto("https://sdk-test.percy.dev");
  await page.waitFor("#cors");
  await percySnapshot("Percy SDK test page [with launch options]");

  await page.goto("http://example.com/");
  await page.waitFor("h1");
  await percySnapshot("HTTP live site [with launch options]");
}, launcherOptions);
