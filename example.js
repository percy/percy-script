const PercyScript = require('./index');

PercyScript.run(async (page, percySnapshot) => {
  await page.goto('https://percy.io');
  await page.waitFor(2000);
  await percySnapshot('Home page');

  await page.goto('https://percy.io/features');
  await page.waitFor(2000);
  await percySnapshot('Features');
})
