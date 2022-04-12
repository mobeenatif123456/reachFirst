const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
let CustomCommand = require('../../../utils/custom-commands');

describe ('login', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 07
  
  it ('should be able to login to the application', function () {
  
    CustomCommand.login(profile.url, profile.network1Admin1.email, profile.network1Admin1.password);
    Util.takeScreenshot();
    Util.click(repo.profileImage);
    let loggedInUserEmail = Util.getText(repo.loggedInUserEmail);
    expect(loggedInUserEmail).toBe(profile.network1Admin1.email);
    Util.click(repo.signOut);

    if(Util.waitForDisplayed(repo.haveAnAccountLoginButton, 90000,true))
    {
      Util.waitForDisplayed(repo.haveAnAccountLoginButton);
      Util.click(repo.haveAnAccountLoginButton);
    }
    else{

      Util.waitForDisplayed(repo.signInButton);
    }
    
  
  });

  it ('login credentials placeholder', function () {

    Util.waitForDisplayed(repo.emailPlaceholder); 
    Util.waitForDisplayed(repo.passwordPlaceholder);
  
  });

  it ('remember me checkbox', function () {

    Util.waitForDisplayed(repo.rememberMeCheckbox);

  });

  it ('should not be able to login to the application', function () {

    Util.setValue(repo.emailInputField, profile.network1Admin1.email);
    Util.setValue(repo.passwordInputField, 'This is a wrong password');
    Util.click(repo.signInButton);
    Util.waitForDisplayed(repo.loginErrorMessageText);

  });

  it ('forget password page', function () {

    Util.click(repo.forgotPassword);
    Util.waitForDisplayed(repo.forgotPasswordPageText);
    Util.takeScreenshot();
    browser.back();
  
  });

  it ('company logo redirects to website', function () {

    Util.click(repo.companyLogo);
    Util.pause(1);
    var url= browser.getUrl();
    console.log(url);
    Util.takeScreenshot();
    browser.back();
    Util.pause(3);

  });

  it ('login page bottom links', function () {

    Util.waitForDisplayed(repo.termsButton);
    Util.waitForDisplayed(repo.gdprButton);
    Util.waitForDisplayed(repo.privacyButton);
    Util.waitForDisplayed(repo.securityButton);
  
  });

  

});