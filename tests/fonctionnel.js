const { Builder } = require('selenium-webdriver');
const chrome      = require('selenium-webdriver/chrome');
const path        = require('path');
const fs          = require('fs');

/**
 * Initialize WebDriver for Electron
 * @param {String} appPath - Path to the Electron application to be tested
 * @return {Object} - Selenium WebDriver object
 */
function initWebDriver(appPath) {
  const distPath      = "/node_modules/electron/dist"
  const chromeOptions = new chrome.Options();

  // Set ChromeDriver binary path
  process.env['PATH'] += path.delimiter + path.join(appPath, './node_modules/chromedriver/lib/chromedriver');
  
  // Mac    dist/Electron.app/Contents/MacOS/Electron
  // Window dist/electron.exe
  // Linux  dist/electron
  let electronPath = fs.existsSync(appPath + distPath + '/Electron.app/Contents/MacOS/Electron') 
                      ? appPath + distPath + '/Electron.app/Contents/MacOS/Electron'
                      : appPath + distPath

  chromeOptions.setChromeBinaryPath(electronPath);

  // Set app path as a Chrome option
  chromeOptions.addArguments(`app=${appPath}`);
  chromeOptions.addArguments('--disable-web-security');
  chromeOptions.addArguments('--auto-open-devtools-for-tabs');

  // Initialize WebDriver
  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();
}


(async function example() {
  const appPath = path.join(__dirname, '../');
  const driver = initWebDriver(appPath);

  try {
    // Your test logic here
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Quit the WebDriver session
    await driver.quit();
  }
})();
