let pkg = require("./package.json");
let puppeteerrPkg = require("puppeteer/package.json");
let {
  agentJsFilename,
  isAgentRunning,
  postSnapshot
} = require("@percy/agent/dist/utils/sdk-utils");

const CLIENT_INFO = `${pkg.name}/${pkg.version}`;
const ENV_INFO = `${puppeteerrPkg.name}/${puppeteerrPkg.version}`;

module.exports = async function percySnapshot(page, name, options) {
  if (!page) {
    throw new Error("Puppeteer 'page' object must be provided.");
  }

  if (!name) {
    throw new Error("'name' must be provided.");
  }

  try {
    await page.addScriptTag({
      path: agentJsFilename()
    });
  } catch (err) {
    // Certain CSP settings prevent Puppeteer from injecting scripts. See:
    // https://github.com/GoogleChrome/puppeteer/issues/2644
    console.log(
      `[percy] Could not take snapshot named '${name}', maybe due to stringent CSPs. Try page.setBypassCSP(true).`
    );
    return;
  }

  if (!(await isAgentRunning())) {
    return;
  }

  let domSnapshot = await page.evaluate(function(name, options) {
    var percyAgentClient = new PercyAgent({ handleAgentCommunication: false });

    return percyAgentClient.snapshot("not used");
  });

  await postDomSnapshot(name, domSnapshot, page.url(), options);
};

async function postDomSnapshot(name, domSnapshot, url, options) {
  let postSuccess = await postSnapshot({
    name,
    url,
    domSnapshot,
    clientInfo: CLIENT_INFO,
    environmentInfo: ENV_INFO,
    ...options
  });

  if (!postSuccess) {
    console.log(`[percy] Error posting snapshot to agent.`);
  }
}
