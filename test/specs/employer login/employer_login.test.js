const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
let CustomCommand = require('../../../utils/custom-commands');

describe ('employer login', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 02
  
  it ('employer should be able to login to the application with valid credentials', function () {
  
    browser.maximizeWindow();
    browser.url(profile.url);
    Util.click(repo.employerLoginLink);
    CustomCommand.login(profile.employer1.email, profile.employer1.password);
    Util.takeScreenshot();
    Util.waitForDisplayed(repo.employerLoginVerification);
    Util.click(repo.profileImageLink);
    Util.click(repo.logoutButton);
    Util.waitForDisplayed(repo.employerLoginLink);

  });

  it ('employer should not be able to login to the application with Invalid credentials', function () {
  
    browser.url(profile.url);
    Util.click(repo.employerLoginLink);
    CustomCommand.login(profile.employer1.email, '123456');
    Util.takeScreenshot();
    Util.waitForNotDisplayed(repo.employerLoginVerification);
    Util.waitForDisplayed(repo.invalidEmailOrPassword);
    
  });

});