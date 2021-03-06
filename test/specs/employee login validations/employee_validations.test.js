const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
let CustomCommand = require('../../../utils/custom-commands');

describe ('employee login validations', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 04
  

  it ('verify that user cannot able to login if fields are left blank and login button is clicked', function () {
  
    browser.maximizeWindow();
    browser.url(profile.url);
    Util.click(repo.employeeLoginLink);
    Util.takeScreenshot();
    Util.click(repo.emailInputField);
    Util.click(repo.passwordInputField);
    Util.click(repo.loginButton);
    Util.pause(3);
    Util.waitForDisplayed(repo.enterEmailAddress);
    Util.waitForDisplayed(repo.enterPassword);
    Util.waitForNotDisplayed(repo.jobLists);

  });

  it ('verify that in password field entered data is shown in form of asterisk', function () {
  
    Util.setValue(repo.passwordInputField,'Kitchen1');
    Util.waitForDisplayed(repo.passwordFieldAsteriks);
  });

  it ('verify that in password field password show option is available and is working', function () {
  
    Util.waitForDisplayed(repo.passwordShowOption);
    Util.click(repo.passwordShowOption);

    Util.waitForNotDisplayed(repo.passwordFieldAsteriks);
    Util.waitForDisplayed(repo.passwordfieldText);

    Util.click(repo.passwordShowOption);
    Util.waitForNotDisplayed(repo.passwordfieldText);


  });

  it ('verify that login button functionality is working on Enter button', function () {
  
    Util.clearValue(repo.emailInputField);
    Util.clearValue(repo.passwordInputField);
    Util.setValue(repo.emailInputField,profile.employee1.email);
    Util.setValue(repo.passwordInputField,profile.employee1.password);

    Util.keys('Enter');
    Util.waitForDisplayed(repo.jobLists);

  });

  




})