const path = require('path');
const chalk = require('chalk');
const repo = require('./../object-repository/object-repo');
const TimelineReporter = require('wdio-timeline-reporter').default;

const wdioConfigTimeout = 240000;
const pauseTimeInSeconds = 0.5;
const enableUtilLogs = true;

class Util {

  setValue(elementFromRepo, value, timeout = wdioConfigTimeout, continueExecutionOnFailure = false) {
    
    const {elementName, elementPath} = elementFromRepo;
    const message = `{ command: set value, name: ${elementName}, path: ${elementPath}, value: ${value} }`;
    
    try {
      enableUtilLogs ? this.logMessage(message) : null;
      const element = this.waitForDisplayed(elementFromRepo, timeout);
      browser.elementSendKeys(element.elementId, value);
      this.pause(pauseTimeInSeconds);
      return element;
    } catch (error) {
      this.logError(message);
      if (!continueExecutionOnFailure) { throw new Error(error.message); }
    }

  }

  clearValue(elementFromRepo, timeout = wdioConfigTimeout, continueExecutionOnFailure = false) {

    const {elementName, elementPath} = elementFromRepo;
    const message = `{ command: clear value, name: ${elementName}, path: ${elementPath} }`;
    
    try {
      enableUtilLogs ? this.logMessage(message) : null;
      const element = this.waitForDisplayed(elementFromRepo, timeout);
      browser.elementClear(element.elementId);
      return element;
    } catch (error) {
      this.logError(message);
      if (!continueExecutionOnFailure) { throw new Error(error.message); }
    }

  }

  click(elementFromRepo, timeout = wdioConfigTimeout, continueExecutionOnFailure = false) {
    
    const {elementName, elementPath} = elementFromRepo; 
    const message = `{ command: click, name: ${elementName}, path: ${elementPath} }`;
    
    try {
      enableUtilLogs ? this.logMessage(message) : null;
      const element = this.waitForDisplayed(elementFromRepo, timeout);
      element.click();
      this.pause(pauseTimeInSeconds);
      return element;
    } catch (error) {
      this.logError(message);
      if (!continueExecutionOnFailure) { throw new Error(error.message); }
    }
    
  }

  getText(elementFromRepo, timeout = wdioConfigTimeout, continueExecutionOnFailure = false) {

    const {elementName, elementPath} = elementFromRepo;
    const message = `{ command: get text, name: ${elementName}, path: ${elementPath} }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      const element = this.waitForDisplayed(elementFromRepo, timeout);
      const elementText = element.getText();
      return elementText;
    } catch (error) {
      this.logError(message);
      if (!continueExecutionOnFailure) { throw new Error(error.message); }
    }
    
  }

  waitForDisplayed(elementFromRepo, timeout = wdioConfigTimeout, continueExecutionOnFailure = false) {

    const {elementName, elementPath} = elementFromRepo;
    const message = `{ command: wait for displayed, name: ${elementName}, path: ${elementPath} }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      const element = $(elementPath);
      element.waitForDisplayed({
        timeout: timeout,
        timeoutMsg: `Wait For Displayed - Element with path {${elementPath}} could not be found in ${timeout} milliseconds.`,
        interval: 200
      });
      return element;
    } catch (error) {
      this.logError(message);
      if (!continueExecutionOnFailure) { throw new Error(error.message); }
    }

  }

  waitForExist(elementFromRepo, timeout = wdioConfigTimeout, continueExecutionOnFailure = false) {

    const {elementName, elementPath} = elementFromRepo;
    const message = `{ command: wait for exist, name: ${elementName}, path: ${elementPath} }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      const element = $(elementPath);
      element.waitForExist({
        timeout: timeout,
        timeoutMsg: `Wait For Exist - Element with path {${elementPath}} could not be found in ${timeout} milliseconds.`,
        interval: 200
      });
      return element;
    } catch (error) {
      this.logError(message);
      if (!continueExecutionOnFailure) { throw new Error(error.message); }
    }

  }

  waitForNotDisplayed(elementFromRepo, timeout = wdioConfigTimeout, continueExecutionOnFailure = false) {

    const {elementName, elementPath} = elementFromRepo;
    const message = `{ command: wait for not displayed, name: ${elementName}, path: ${elementPath} }`;
    
    try {
      enableUtilLogs ? this.logMessage(message) : null;
      const element = $(elementPath);
      element.waitForDisplayed({
        timeout: timeout,
        reverse: true,
        timeoutMsg: `Wait For Not Displayed - Element with path {${elementPath}} still found after ${timeout} milliseconds.`,
        interval: 300
      });
      return element;
    } catch (error) {
      this.logError(message);
      if (!continueExecutionOnFailure) { throw new Error(error.message); }
    }

  }

  moveTo(elementFromRepo, timeoutInMilliseconds = wdioConfigTimeout, continueExecutionOnFailure = false) {

    const {elementName, elementPath} = elementFromRepo;
    const message = `{ command: move to, name: ${elementName}, path: ${elementPath} }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      let element = this.waitForDisplayed(elementFromRepo, timeoutInMilliseconds);
      this.pause(3);
      element.moveTo();
      return element;
    } catch (error) {
      this.logError(message);
      if (!continueExecutionOnFailure) { throw new Error(error.message); }
    }

  }

  pause(seconds) {

    const message = `{ command: pause, seconds: ${seconds} }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      browser.pause(seconds * 1000);
    } catch (error) {
      this.logError(message);
      throw new Error(error.message);
    }
    
  }

  keys(keys) {

    const message = `{ command: keys, keys: ${keys} }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      browser.keys(keys);
    } catch (error) {
      this.logError(message);
      throw new Error(error.message);
    }
    
  }

  uploadFile(elementFromRepo, uploadFilePath, timeoutInMilliseconds = wdioConfigTimeout) {

    const {elementName, elementPath} = elementFromRepo;
    const message = `{ command: upload file, name: ${elementName}, path: ${elementPath} }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      let element = $(elementPath);
      this.waitForExist(elementFromRepo, timeoutInMilliseconds);
      let remoteUploadFilePath = browser.uploadFile(uploadFilePath);
      browser.elementSendKeys(element.elementId, remoteUploadFilePath);
    } catch (error) {
      this.logError(message);
      throw new Error(error.message);
    }

  }

  getResourcePath(fileName) {

    // This method will return the absoulte path for a given resource available in resources directory. 
    // For example images, csv etc.
    // Please provide complete file name, meaning file name with extension.

    const message = `{ command: get resoure path, fileName: ${fileName} }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      let resourcePath = path.join(__dirname, '..', 'resources', fileName);
      return resourcePath;
    } catch (error) {
      this.logError(message);
      throw new Error(error.message);
    }

  }

  getAttributeValue(elementFromRepo, attributeName, timeoutInMilliseconds = wdioConfigTimeout, continueExecutionOnFailure = false) {

    const {elementName, elementPath} = elementFromRepo;
    const message = `{ command: get attribute value, name: ${elementName}, path: ${elementPath} }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      let element = this.waitForDisplayed(elementFromRepo, timeoutInMilliseconds);
      const attributeValue = element.getAttribute(attributeName);
      return attributeValue;
    } catch (error) {
      this.logError(message);
      if (!continueExecutionOnFailure) { throw new Error(error.message); }
    }

  }

  takeScreenshot() {

    const message = `{ command: take screenshot }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      browser.takeScreenshot();
    } catch (error) {
      this.logError(message)
      throw new Error(error.message);
    }
    
  }
  
  closeBrowser() {
    
    const message = `{ command: close browser }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      browser.deleteSession();
      this.pause(2);
    } catch (error) {
      this.logError(message);
      throw new Error(error.message);
    }
    
  }

  openBrowser() {

    const message = `{ command: open browser }`;
      
    try {
      enableUtilLogs ? this.logMessage(message) : null;
      const newSession = browser.newSession({
        'alwaysMatch': {
          'browserName': 'chrome',
          'acceptInsecureCerts': true,
          'goog:chromeOptions': {
            'prefs': {
              credentials_enable_service: false,
              profile: {
                password_manager_enabled: false
              }
            },
            'excludeSwitches': ['enable-automation', '--disable-notifications']
          }
        }
      });
      
      browser.maximizeWindow();
      return newSession;
    } catch (error) {
      this.logError(message);
      throw new Error(error.message);
    }

  }

  navigateToURL(url) {

    const message = `{ command: navigate to url, url: ${url} }`;
    
    try {
      enableUtilLogs ? this.logMessage(message) : null;
      browser.url(url)
      return true; 
    } catch (error) {
      this.logError(message);
      throw new Error(error.message);
    }
    
  }

  getBrowserSession() {

    const message = `{ command: get browser session }`;
    enableUtilLogs ? this.logMessage(message) : null;
    return {
      'sessionId': driver.sessionId,
      'capabilities' : {
        'chrome': {
          'userDataDir': driver.capabilities.chrome.userDataDir
        },
      'goog:chromeOptions': driver.capabilities['goog:chromeOptions'],
      'webdriver.remote.sessionid': driver.capabilities['webdriver.remote.sessionid']
      }
    }
  }
  
  switchToBrowser(otherBrowserSession) {

    const message = `{ command: switch to browser, sessionId: ${otherBrowserSession.sessionId} }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      driver.sessionId = otherBrowserSession.sessionId;
      driver.capabilities.chrome.userDataDir = otherBrowserSession.capabilities.chrome.userDataDir;
      driver.capabilities['goog:chromeOptions'] = otherBrowserSession.capabilities['goog:chromeOptions'];
      driver.capabilities['webdriver.remote.sessionid'] = otherBrowserSession.capabilities['webdriver.remote.sessionid'];
      browser.maximizeWindow();
      this.pause(2);
    } catch (error) {
      this.logError(message);
      throw new Error(error.message);
    }
      
  }

  dragAndDrop(elementFromRepo, dragAndDropCoordinates, timeoutInMilliseconds = wdioConfigTimeout, continueExecutionOnFailure = false) {

    // Example: dragAndDropCoordinates => { x: 100, y: 200 }
    
    const {elementName, elementPath} = elementFromRepo;
    const message = `{ command: drag and drop, name: ${elementName}, path: ${elementPath} }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      let element = this.waitForDisplayed(elementFromRepo, timeoutInMilliseconds);
      element.dragAndDrop(dragAndDropCoordinates);
      return element;
    } catch (error) {
      this.logError(message);
      if (!continueExecutionOnFailure) { throw new Error(error.message); }
    }

  }

  getElementsCount(elementFromRepo, waitForDisplayed = false, continueExecutionOnFailure = false) {

    // Please make sure that elements are already present or visible.
    const {elementName, elementPath} = elementFromRepo;
    const message = `{ command: get elements count, name: ${elementName}, path: ${elementPath} }`;
    
    try {
      enableUtilLogs ? this.logMessage(message) : null;
      if (waitForDisplayed) { this.waitForDisplayed(elementFromRepo, timeoutInMilliseconds); }
      let elements = $$(elementPath);
      return elements.length;
    } catch (error) {
      this.logError(message);
      if (!continueExecutionOnFailure) { throw new Error(error.message); }
    }

  }

  isDisplayed(elementFromRepo) {

    const {elementName, elementPath} = elementFromRepo;
    const message = `{ command: is displayed, name: ${elementName}, path: ${elementPath} }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      const elementDisplayedStatus = $(elementPath).isDisplayed();
      return elementDisplayedStatus; 
    } catch (error) {
      this.logError(message);
      throw new Error(error.message);
    }

  }

  getWindowHandles() {

    // Please make sure that windows are already available.
    // First window available at index 0 and second window at index 1 and so on.
  
    const message = `{ command: get window handles }`;

      try {
        enableUtilLogs ? this.logMessage(message) : null;
        const browserWindowHandles = browser.getWindowHandles();
        return browserWindowHandles;
      } catch (error) {
        this.logError(message);
        throw new Error(error.message);
      }

  }

  getCurrentWindowHandle() {
   
    const message = `{ command: get current window handle }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      const currentWindowHandle = browser.getWindowHandle();
      return currentWindowHandle;
    } catch (error) {
      this.logError(message);
      throw new Error(error.message);
    }
    
  }

  switchToWindow(windowHandle) {

    const message = `{ command: switch to window handle, window handle: ${windowHandle} }`;
    
    try {
      enableUtilLogs ? this.logMessage(message) : null;
      browser.switchToWindow(windowHandle);
    } catch (error) {
      this.logError(message);
      throw new Error(error.message);
    }
    
  }

  closeTab() {

    const message = `{ command: close tab }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      browser.closeWindow();
    } catch (error) {
      this.logError(message);
      throw new Error(error.message);
    }
    
  }

  openNewTabAndSwitch() {

    const message = `{ command: open new tab and switch }`;

    try {
      enableUtilLogs ? this.logMessage(message) : null;
      browser.execute(function () { open(); });
      const browserTabs = this.getWindowHandles();
      const newTabWindowHandle = browserTabs[1];
      this.switchToWindow(newTabWindowHandle);
      return newTabWindowHandle;
    } catch (error) {
      this.logError(message);
      throw new Error(error.message);
    }

  }

  refresh() {

    const message = `{ command: refresh }`;
    
    try {
      enableUtilLogs ? this.logMessage(message) : null;
      browser.refresh();
    } catch (error) {
      this.logError(message);
      throw new Error(error.message);
    }
    
  }


  logMessage(string) {
    TimelineReporter.addContext(string);
    console.log(chalk.green(string));
  }
  
  logError(string) {
    console.log(chalk.black.bgYellow.bold(string));
  }

}

module.exports = new Util();