const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');
var fs= require('fs');



describe('signup', function () {

  // Author: Shoaib Arslan Kiyani
  // Total Testcases: 4

  const signupDomain = profile.signupDomain;
  let signupUserEmail = null;
  
 
  it('signup without profile pic and group creation', function() {

    browser.url(profile.url);

    for (let i=0;i<500;i++)
    {

    const timestampUserEmail = CustomCommand.getTimestamp();
    signupUserEmail = timestampUserEmail + '@' + signupDomain;

    console.log("sign up email is", signupUserEmail);
    Util.click(repo.signupNowLink);
    console.log('Signup Email:', signupUserEmail);
    Util.setValue(repo.signupEmailInputField, signupUserEmail);
    Util.click(repo.signupButton);
    Util.pause(2);

    Util.setValue(repo.verificationCodeInputField, '1111');
    Util.click(repo.verifyButton);

    // Continue signup after verification process.

    const signupUserFirstName = 'Automation';
    const signupUserLastName = 'User';
    const signupUserPosition = 'Load Tester';
    const signupUserPassword = 'automation';

    Util.setValue(repo.signupFirstNameInputField, signupUserFirstName);
    Util.setValue(repo.signupLastNameInputField, signupUserLastName);
    Util.setValue(repo.signupJobTitleInputField, signupUserPosition);
    Util.setValue(repo.signupPasswordInputField, signupUserPassword);

    Util.click(repo.signupNextButton);

    Util.click(repo.signupSkipThisForNowProfilePictureLink);
    Util.click(repo.signupSkipThisForNowGroupCreationLink);
    Util.click(repo.signupGetStartedLink);

    console.log(signupUserEmail);

    commonSignupCompletionSteps(signupUserEmail);

    fs.appendFileSync('resources/data3.csv', "\r\n" + signupUserEmail);

    }
    
  });

});



function createTempEmailAccount(userName, emailDomainFromAvailableList) {

  // Supported Domains:
  
  /*
  sharklasers.com
  guerrillamail.info
  grr.la
  guerrillamail.biz
  guerrillamail.com
  guerrillamail.info
  guerrillamail.net
  guerrillamail.org
  guerrillamailblock.com
  pokemail.net
  spam4.me

  */

 const emailServiceProviderURL = `https://www.guerrillamail.com/`;
 Util.navigateToURL(emailServiceProviderURL);

  if(Util.waitForDisplayed(repo.inboxId, 30000, true)){
    Util.click(repo.inboxId);

  }
  else{
    Util.refresh();
    Util.click(repo.inboxId);
  }
  
  const tempEmail = userName + '@' + emailDomainFromAvailableList;
  console.log('Temp Email:', tempEmail);

  Util.click(repo.inboxIdInputField);
  Util.clearValue(repo.inboxIdInputField);
  Util.setValue(repo.inboxIdInputField, userName);

  Util.click(repo.setButton);

  Util.click(repo.selectDomainDropdown);

  Util.click(repo.selectDomain(emailDomainFromAvailableList));

  Util.click(repo.scrambleAddressCheckbox);

  Util.waitForDisplayed(repo.emailAddress(tempEmail));

  return tempEmail;

}


function commonSignupCompletionSteps(signupEmail) {

    Util.click(repo.signupCompletionScreenCrossIcon);
    Util.pause(3);  
    Util.click(repo.signupClickHereLink);
    Util.pause(5);

    Util.click(repo.profileImageDropdown);
  
    Util.click(repo.signOut);
    Util.takeScreenshot();
  
    if(Util.waitForDisplayed(repo.haveAnAccountLoginButton,90000,true))
      {
        Util.waitForDisplayed(repo.haveAnAccountLoginButton);
        Util.click(repo.haveAnAccountLoginButton);
      }
      else{
  
        Util.waitForDisplayed(repo.signInButton);
      }
  
  
  }