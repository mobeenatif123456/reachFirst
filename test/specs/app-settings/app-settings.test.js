const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');
const { publicGroupEveryone } = require('../../../object-repository/object-repo');

describe('app-settings', function() {

  // Author: Shoaib Arslan Kiyani
  // Total Test Cases: 5

  let email = profile.network10User2.email;
  let password = profile.network10User2.password;
  let sessionBrowser1 = null;
  let sessionBrowser2 = null;

  const browserSessions = [];

  const signupDomain = profile.signupDomain;

  xit('verify user can change login email', function() {

    CustomCommand.login(profile.url, email, password);
    Util.click(repo.profileImageDropdown);
    Util.click(repo.notificationPreferences);
    Util.click(repo.myAccountLink);
    Util.click(repo.newLoginEmailInputField);
    const timestamp = CustomCommand.getTimestamp();
    const userDomain = email.match(/[^@]*$/);
    const newEmailAddress = 'testemail' + '@' + userDomain;
    console.log('Previous Email Address:', email);
    console.log('Updated Email Address:', newEmailAddress);
    Util.setValue(repo.newLoginEmailInputField, newEmailAddress);
    Util.click(repo.changeEmailButton);
    Util.waitForDisplayed(repo.emailAddressUpdatedSuccessMessage);
    Util.takeScreenshot();
    Util.click(repo.profileImageDropdown);
    Util.click(repo.signOut);
    
    if(Util.waitForDisplayed(repo.haveAnAccountLoginButton,5000,true))
    {
      Util.waitForDisplayed(repo.haveAnAccountLoginButton);
    }
    else{

      Util.waitForDisplayed(repo.signInButton);
    }
    
    CustomCommand.login(profile.url, newEmailAddress, password);
    Util.click(repo.profileImageDropdown);
    Util.takeScreenshot();
    Util.click(repo.notificationPreferences);
    Util.click(repo.myAccountLink);
    Util.click(repo.newLoginEmailInputField);
    Util.setValue(repo.newLoginEmailInputField, email);
    Util.click(repo.changeEmailButton);
    Util.waitForDisplayed(repo.emailAddressUpdatedSuccessMessage);
    
  });
  
  xit('verify user can change login password', function() {

    Util.setValue(repo.currentPasswordInputField, password);
    const newPassword = 'Kitchen2';
    console.log('Previous Password:', password);
    console.log('Updated Password:', newPassword);
    Util.setValue(repo.newPasswordInputField, newPassword);
    Util.click(repo.changePasswordButton);
    Util.waitForDisplayed(repo.passwordUpdatedSuccessMessage);
    Util.takeScreenshot();
    Util.click(repo.profileImageDropdown);
    Util.click(repo.signOut);
    
    if(Util.waitForDisplayed(repo.haveAnAccountLoginButton,5000,true))
    {
      Util.waitForDisplayed(repo.haveAnAccountLoginButton);
    }
    else{

      Util.waitForDisplayed(repo.signInButton);
    }

    CustomCommand.login(profile.url, email, newPassword);
    Util.click(repo.profileImageDropdown);
    Util.click(repo.notificationPreferences);
    Util.click(repo.myAccountLink);

    Util.pause(5);

    Util.setValue(repo.currentPasswordInputField, newPassword);
    Util.setValue(repo.newPasswordInputField, password);
    Util.click(repo.changePasswordButton);
    Util.waitForDisplayed(repo.passwordUpdatedSuccessMessage);

  });

  it('verify user can sign out all other login sessions', function() {

    CustomCommand.login(profile.url, email, password);

    Util.click(repo.profileImageDropdown);
    Util.waitForDisplayed(repo.notificationPreferences);
    Util.click(repo.notificationPreferences);
    Util.click(repo.myAccountLink);

    Util.pause(5);

    sessionBrowser1 = Util.getBrowserSession();

    browserSessions.push(sessionBrowser1);
    sessionBrowser2 = Util.openBrowser();

    browserSessions.push(sessionBrowser2);
    
    Util.switchToBrowser(sessionBrowser2);

    CustomCommand.login(profile.url, email, password);
    Util.waitForDisplayed(repo.networkLogo);

    Util.switchToBrowser(sessionBrowser1);

    Util.click(repo.signOutAllOtherSessions);

    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser2);

    if(Util.waitForDisplayed(repo.haveAnAccountLoginButton, 90000,true))
    {
      Util.waitForDisplayed(repo.haveAnAccountLoginButton);
    }
    else{

      Util.waitForDisplayed(repo.signInButton);
    }

    Util.takeScreenshot();

    Util.closeBrowser();
    
    Util.switchToBrowser(sessionBrowser1);
  
  });

  it('verify user can change default recipients for posts', function() {

    const timestamp = CustomCommand.getTimestamp();

    Util.click(repo.networkLogo);

    const privateGroupAlreadyPresent = Util.isDisplayed(repo.firstPrivateGroupInGroupsList);
    
    let privateGroupName = null;

    if (privateGroupAlreadyPresent) {
      privateGroupName = Util.getText(repo.firstPrivateGroupInGroupsList);
    }else{
      CustomCommand.createPrivateGroup(timestamp);
      privateGroupName = Util.getText(repo.firstPrivateGroupInGroupsList);
    }

    Util.click(repo.profileImageDropdown);
    Util.click(repo.notificationPreferences);
    Util.click(repo.feedAndSharingLink);
    Util.click(repo.feedAndSharingToField);

    Util.setValue(repo.feedAndSharingToInputField, privateGroupName);
    Util.click(repo.groupSuggestionforappSettings(privateGroupName));
    Util.waitForDisplayed(repo.settingsSavedSuccessMessage);
    Util.takeScreenshot();

    Util.waitForDisplayed(repo.groupAddedInDefaultRecepientVerification(privateGroupName));
    
    Util.click(repo.networkLogo);

    Util.click(repo.inlineInsertTextField);
    Util.pause(2);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This is a test post with group as default recipient.`);

    Util.waitForDisplayed(repo.privateGroupInInlineInsert(privateGroupName));
    Util.takeScreenshot();
    Util.keys('Escape');
    Util.pause(1);

    // Remove default recipient of post.
    Util.click(repo.profileImageDropdown);
    Util.click(repo.notificationPreferences);
    Util.click(repo.feedAndSharingLink);
    Util.click(repo.defaultRecipientGroupCrossIcon(privateGroupName));
    Util.waitForDisplayed(repo.settingsSavedSuccessMessage);

    Util.waitForNotDisplayed(repo.groupAddedInDefaultRecepientVerification(privateGroupName));


    if (privateGroupAlreadyPresent) {

      console.log('Do nothing here');

    }else{
      
      Util.click(repo.networkLogo);

      Util.waitForDisplayed(repo.grpPost(privateGroupName));
      Util.click(repo.grpPost(privateGroupName));

      Util.pause(1);

      Util.click(repo.groupToggleDropdown(privateGroupName));
      Util.pause(3);
      Util.click(repo.deleteGroup);
      Util.pause(1);
      Util.takeScreenshot();
      Util.click(repo.deleteButton);
      Util.pause(3);
      Util.click(repo.grpPost(privateGroupName));
      Util.waitForDisplayed(repo.grpDeletionVerification);

      Util.click(repo.myFeed);

      Util.click(repo.profileImageDropdown);
      Util.click(repo.notificationPreferences);
      Util.click(repo.feedAndSharingLink);
    }

  });
  it('verify user can hide group and its posts from feed', function() {
    const timestamp = CustomCommand.getTimestamp();
    Util.click(repo.HidePostFromMyFeed);
    const everyOneText= 'Everyone'
    Util.pause(2);
    Util.setValue(repo.hidePostFromMyFeedinput, everyOneText);
    Util.click(repo.groupSuggestionforappSettings(everyOneText));
    Util.click(repo.HideButtonFromMyFeed);
    Util.click(repo.HideGroupLinkInHidePostInaAppSetting);
    Util.waitForDisplayed(repo.CheckEveyoneGroupInUnhideGroupsPopUpModel);
    Util.click(repo.UnhideGroupsCrossIcon);
    Util.takeScreenshot();
    Util.click(repo.networkLogo);
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, everyOneText);
    Util.click(repo.suggestedPostRecipient);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post is for network and admin users.`);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.click(repo.networkLogo);
    Util.pause(2);
    Util.waitForNotDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();
    Util.click(repo.profileImageDropdown);
    Util.click(repo.profileDropdownSetting);
    Util.click(repo.feedAndSharingLink);
    Util.click(repo.HideGroupLinkInHidePostInaAppSetting);
    Util.click(repo.CheckEveyoneGroupInUnhideGroupsPopUpModel);
    Util.waitForNotDisplayed(repo.CheckEveyoneGroupInUnhideGroupsPopUpModel);
    Util.click(repo.UnhideGroupsCrossIcon);
    Util.click(repo.networkLogo);
    Util.click(repo.profileImageDropdown);
    Util.click(repo.signOut);
    
    if(Util.waitForDisplayed(repo.haveAnAccountLoginButton, 90000,true))
    {
      Util.waitForDisplayed(repo.haveAnAccountLoginButton);
    }
    else{

      Util.waitForDisplayed(repo.signInButton);
    }
   




  });

  it('verify user can disable account', function() {

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


    if(signupDomain=="guerrillamail.info")
    {

      Util.setValue(repo.verificationCodeInputField, '1111');
      Util.click(repo.verifyButton);

    }

else{

  for (let i = 0; i < 3; i++) {

    console.log("value of i is ", i);

    Util.switchToWindow(emailWindowHandle);
    
    let verificationCode = null;

    try { verificationCode = Util.getText(repo.emailSubject, 200000).match(/\d.*/g)[0]; } catch (error) {}
    
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

  if(Util.waitForDisplayed(repo.signInButton,60000,true))
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