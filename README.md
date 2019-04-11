# @percy/script
[![CircleCI](https://circleci.com/gh/percy/percy-script/tree/master.svg?style=svg)](https://circleci.com/gh/percy/percy-script/tree/master)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io)

PercyScript is the easiest way to get started with visual testing and [Percy](https://percy.io).

A small example of what PercyScript looks like:

```javascript
const PercyScript = require('@percy/script');

PercyScript.run(async (page, percySnapshot) => {
  await page.goto('http://localhost8080/');
  await page.waitFor(2000);
  await percySnapshot('Home page');

  await page.goto('http://localhost8080/about');
  await page.waitFor(2000);
  await percySnapshot('About');
});
```

## Resources

* [Setup docs](https://docs.percy.io/docs/percyscript)
