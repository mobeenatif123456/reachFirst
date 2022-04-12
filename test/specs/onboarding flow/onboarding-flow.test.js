const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');
const utils = require('../../../utils/utils');

// Author: Mobeen Atif
// Total Test Cases: 1

describe('onboarding flow', function () {

  const signupDomain = profile.signupDomain;

  const profilePictureFilePath = Util.getResourcePath('mario.jpg');

  let grpName = null;


  it('verify that onboarding flow is working', function () {

    const timestampUserEmail = CustomCommand.getTimestamp();
    signupUserEmail = createTempEmailAccount(timestampUserEmail, signupDomain);

    const emailWindowHandle = Util.getCurrentWindowHandle();
    const convoWindowHandle = Util.openNewTabAndSwitch();

    browser.url(profile.url);

    Util.click(repo.signupNowLink);
    console.log('Signup Email:', signupUserEmail);
    Util.setValue(repo.signupEmailInputField, signupUserEmail);
    Util.click(repo.signupButton);
    Util.pause(2);


    if (signupDomain == "guerrillamail.info") {

      Util.setValue(repo.verificationCodeInputField, '1111');
      Util.click(repo.verifyButton);

    }

    else {

      for (let i = 0; i < 3; i++) {

        console.log("value of i is ", i);

        Util.switchToWindow(emailWindowHandle);

        let verificationCode = null;

        try { verificationCode = Util.getText(repo.emailSubject, 200000).match(/\d.*/g)[0]; } catch (error) { }

        if (verificationCode) {

          console.log('Verification Code:', verificationCode);
          Util.takeScreenshot();
          Util.switchToWindow(convoWindowHandle);
          Util.clearValue(repo.verificationCodeInputField);
          Util.setValue(repo.verificationCodeInputField, verificationCode);
          Util.click(repo.verifyButton);
          Util.takeScreenshot();

          try {
            Util.waitForDisplayed(repo.welcomeTitleForNewNetwork, 30000);
            console.log('Verification Code:', 'Correct');
            Util.switchToWindow(emailWindowHandle);
            Util.closeTab();
            Util.switchToWindow(convoWindowHandle);
            break;
          } catch (error) {
            console.log('Verification Code:', 'Not Correct');
            Util.click(repo.clickHereLinkToResendVerficationCodeEmail);
            Util.waitForDisplayed(repo.verificationCodeSentSuccessMessage);
            continue;
          }

        }

        if (!verificationCode) {
          console.log('Verification Code:', 'Not Received');
          Util.switchToWindow(convoWindowHandle);
          Util.click(repo.clickHereToResendLink);
          Util.waitForDisplayed(repo.verificationCodeSentSuccessMessage);
        }

      }



    }

    // Continue signup after verification process.

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

    Util.waitForDisplayed(repo.signupClickHereLink);

    Util.waitForDisplayed(repo.typeSomethingHere);

    Util.keys('Hello');

    Util.keys('Enter');

    Util.waitForDisplayed(repo.selectingSomeText);

    Util.waitForDisplayed(repo.commentOnThisPopup);

    Util.click(repo.commentOnThisPopup);

    Util.waitForDisplayed(repo.typeGotIt);

    Util.keys('Got it');

    Util.keys('Enter');

    //   Util.waitForDisplayed(repo.taskCompletion1Percent);

    Util.waitForDisplayed(repo.learnaboutfeedStriked);

    Util.waitForDisplayed(repo.learAboutFeedChecked);

    Util.waitForDisplayed(repo.createaNewGroupButton);

    Util.click(repo.createaNewGroupButton);

    grpName = CustomCommand.getTimestamp();

    Util.setValue(repo.grpName, `${grpName}`);
    Util.pause(2);
    Util.click(repo.nextButtonForGrpCreation);
    Util.pause(2);
    Util.click(repo.createGroup);
    Util.pause(10);

    Util.waitForDisplayed(repo.grpPost(grpName));

    Util.waitForDisplayed(repo.createaGroupStriked);

    Util.waitForDisplayed(repo.createaGroupChecked);

    Util.waitForDisplayed(repo.shareaPost);

    Util.waitForDisplayed(repo.letsDoThisButton);

    Util.click(repo.letsDoThisButton);

    Util.waitForDisplayed(repo.shareThisPost);

    Util.click(repo.shareThisPost);

    Util.waitForDisplayed(repo.gettingStarted);

    Util.waitForDisplayed(repo.shareaPostStriked);

    Util.waitForDisplayed(repo.shareaPostChecked);

    Util.waitForDisplayed(repo.addProfilePhotoButton);

    Util.click(repo.addProfilePhotoButton);

    Util.uploadFile(repo.userFeedViewProfileImageUploadInputField, profilePictureFilePath);

    Util.click(repo.applyPhotoButton);

    Util.waitForDisplayed(repo.applyPhotoGeneratingThumbnails);

    Util.waitForNotDisplayed(repo.applyPhotoGeneratingThumbnails);

    Util.waitForDisplayed(repo.navBarProfileImage);

    Util.waitForDisplayed(repo.setUpanIntegrationButton);

    Util.pause(120);
    
    Util.setValue(repo.feedSearchInputField, grpName);
    Util.pause(2);
    Util.takeScreenshot();

    Util.click(repo.groupSuggestion(grpName));

    Util.click(repo.groupToggleDropdown(grpName));
    Util.pause(3);
    Util.click(repo.deleteGroup);
    Util.pause(1);
    Util.takeScreenshot();
    Util.click(repo.deleteButton);
    Util.pause(3);


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

    if (Util.waitForDisplayed(repo.inboxId, 30000, true)) {
      Util.click(repo.inboxId);

    }
    else {
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

    if (Util.waitForDisplayed(repo.signInButton, 60000, true)) {

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

    else {

      Util.click(repo.signupPolicyAcceptButton, 10000, true);
      Util.click(repo.signupCompletionScreenCrossIcon);
      Util.pause(3);


    }


  }


})