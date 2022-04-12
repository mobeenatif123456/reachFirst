const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');

describe('password reset', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 03
  
  it('using direct link', function () {

    browser.maximizeWindow();
    browser.url(profile.url);
    Util.click(repo.forgotPassword);
    Util.waitForDisplayed(repo.forgotPasswordPageText);
    let passwordResetPageURL =  browser.getUrl();
    browser.url(passwordResetPageURL);
    Util.waitForDisplayed(repo.forgotPasswordPageText);
    
  });

  it('using not registered or incomplete email', function () {
    
    Util.setValue(repo.passwordResetEmailInputField, 'unregistered-email@unregistered-domain.com');
    Util.click(repo.sendButtonPasswordResetPage);
    Util.waitForDisplayed(repo.unregisteredEmailError);
    Util.pause(5);
    Util.clearValue(repo.passwordResetEmailInputField);
    Util.pause(3);
    Util.setValue(repo.passwordResetEmailInputField, 'incomplet-email@convo');
    Util.pause(2);
    Util.click(repo.sendButtonPasswordResetPage);
    Util.waitForDisplayed(repo.invalidEmailError);
    
  });

  it('successful using correct email', function () {

    Util.pause(3);
    Util.clearValue(repo.passwordResetEmailInputField);
    Util.pause(2);
    Util.setValue(repo.passwordResetEmailInputField, profile.network1Admin1.email);
    Util.click(repo.sendButtonPasswordResetPage);
    Util.pause(2);
    Util.waitForDisplayed(repo.passwordResetSuccessMessage);
    
  
  });


});