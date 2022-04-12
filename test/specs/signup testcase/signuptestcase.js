const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('signup', function () {

    // Author: Shoaib Arslan Kiyani
    // Total Testcases: 4
  
    const signupDomain = profile.signupDomain;
    let signupUserEmail = null;

    const jsonfile = 'ministry1.json';

    it('signup without profile pic and group creation', function() {
  
      var mydata = JSON.parse(Util.getResourcePath(jsonfile));

      console.log(mydata[0].FIrst_Name);

      /*
      signupUserEmail = createTempEmailAccount(timestampUserEmail, signupDomain);
      
      browser.url(profile.url);
  
      Util.click(repo.signupNowLink);
      console.log('Signup Email:', signupUserEmail);
      Util.setValue(repo.signupEmailInputField, signupUserEmail);
      Util.click(repo.signupButton);
      Util.pause(2);
  
      Util.setValue(repo.verificationCodeInputField, '1111');
      Util.click(repo.verifyButton);
  
      const signupUserFirstName = 'Automation';
      const signupUserLastName = 'Tester';
      const signupUserPosition = 'Load Tester';
      const signupUserPassword = '123456';
  
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

      */
      
    });
  
  });

  function commonSignupCompletionSteps(signupEmail) {

    if(Util.waitForDisplayed(repo.signInButton,30000,true))
    {
    
        Util.refresh();
        Util.waitForDisplayed(repo.signInButton);
        Util.clearValue(repo.emailInputField);
        Util.setValue(repo.emailInputField, signupEmail);
        Util.clearValue(repo.passwordInputField);
        Util.setValue(repo.passwordInputField, '123456');
        Util.takeScreenshot();
        Util.click(repo.signInButton);
        Util.pause(3);
    
    }
    
    else{
    
      Util.click(repo.signupPolicyAcceptButton, 10000, true);
      Util.click(repo.signupCompletionScreenCrossIcon);
      Util.pause(3);
    
    
    }
    
      Util.click(repo.signupClickHereLink);
      Util.pause(5);
      Util.waitForDisplayed(repo.signupConvoGettingStartedPlaylistPost);
      Util.click(repo.upgradeNowButton, 5000, true);
    
    
      Util.click(repo.profileImageDropdown);
    
      Util.click(repo.notificationPreferences);
      Util.click(repo.myAccountLink);
      Util.click(repo.disableMyAccountLink);
      Util.click(repo.disableAccountButton);
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