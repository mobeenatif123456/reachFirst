const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
let CustomCommand = require('../../../utils/custom-commands');

describe ('employee login', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 02
  
  it ('employee should be able to login to the application with valid credentials', function () {
  
    browser.maximizeWindow();
    browser.url(profile.url);
    Util.click(repo.employeeLoginLink);
    CustomCommand.login(profile.employee1.email, profile.employee1.password);
    Util.takeScreenshot();
    Util.waitForNotDisplayed(repo.employerLoginVerification);
    Util.waitForDisplayed(repo.jobLists);
    Util.click(repo.profileImageLink);
    Util.click(repo.logoutButton);
    Util.waitForDisplayed(repo.employeeLoginLink);

  });

  it ('employee should not be able to login to the application with Invalid credentials', function () {
  
    browser.url(profile.url);
    Util.click(repo.employeeLoginLink);
    CustomCommand.login(profile.employee1.email, '123456');
    Util.takeScreenshot();
    Util.waitForDisplayed(repo.invalidEmailOrPassword);
    Util.click(repo.closeButton);
    
  });





});