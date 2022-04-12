const repo = require('../../../object-repository/object-repo');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');
const profile = require('../../../config/profile');

describe('temp', function() {
  
  const browserSessions = [];

  it('close multiple browsers', function() {
    browser.url('http://www.google.com');
    const currentBrowserSession = Util.getBrowserSession();
    browserSessions.push(currentBrowserSession);
    const newBrowserSession = Util.openBrowser();
    browserSessions.push(newBrowserSession);
    Util.switchToBrowser(newBrowserSession);
    browser.url('http://www.google.com');
    throw new Error('Something went wrong');
  });

  after(function() {
    if (this.currentTest.state === 'failed') {
      browserSessions.forEach((browserSession) => {
        try {
          Util.switchToBrowser(browserSession);
          browser.deleteSession();
          console.log('INFO:', 'Closing browser due to failure of test case.');  
        } catch (error) {}
      });
    }
  });
  
});