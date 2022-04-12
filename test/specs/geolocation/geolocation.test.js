const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('geolocation', function () {

  // Author: Shoaib Arslan Kiyani
  // Total Test Cases: 16

  let nameOfPrivateGroupWithGeolocation = null;
  let nameOfPrivateGroupWithoutGeolocation = null;

  let sessionBrowser1 = null;
  let sessionBrowser2 = null;

  const browserSessions = [];

  
  it('verify share location with post content automatically checkbox exists in group settings', function () {

    CustomCommand.login(profile.url, profile.network6Admin1.email, profile.network6Admin1.password);
    const timestamp = CustomCommand.getTimestamp();
    nameOfPrivateGroupWithoutGeolocation = CustomCommand.createPrivateGroup('P' + timestamp);
    nameOfPrivateGroupWithGeolocation = CustomCommand.createPrivateGroup(timestamp);

    Util.takeScreenshot();
    navigateToGroupViewThroughGroupCreationPost(nameOfPrivateGroupWithGeolocation);
    Util.click(repo.elipsesInGroupView);
    Util.click(repo.groupSettingsInGroupViewElipsesMenu);
    Util.takeScreenshot();
    Util.click(repo.checkboxShareLocationWithPostContentAutomaticallyInGroupSettings);
    Util.takeScreenshot();
    
  });

  it('verify normal post creation with geolocation', function () {

    const timestamp = CustomCommand.getTimestamp();
    Util.click(repo.saveChangesButtonInGroupSettings);
    Util.waitForDisplayed(repo.settingsSavedSuccessMessage);
    Util.pause(2);

    Util.click(repo.networkLogo);
    
    // Normal post creation with geolocation.

    Util.click(repo.inlineInsertTextField);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will fetch location automatically.`);
    Util.pause(2); 
    Util.click(repo.toInputField);
    Util.pause(5);

    Util.setValue(repo.typeToInputField, nameOfPrivateGroupWithGeolocation);
    Util.pause(5);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(1);
    
    const geoLocationAddressInInlineInsert = Util.getText(repo.geoLocationAddressInInlineInsert);
    Util.pause(2);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);
    const geoLocationAddressInCreatedNormalPostText = Util.getText(repo.geoLocationAddressInCreatedNormalPost(timestamp));
    expect(geoLocationAddressInCreatedNormalPostText).toBe(geoLocationAddressInInlineInsert);
    Util.takeScreenshot();

  });

  it('verify mentioning group with geolocation enabled in a comment does not add location to the post', function () {

    const timestamp = CustomCommand.getTimestamp();    
    
    Util.click(repo.inlineInsertTextField);
    
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network6Admin1.email);
    Util.pause(3);
    Util.click(repo.suggestedPostRecipient);
    
    Util.pause(2);
    
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This test post will have a group with geolocation enabled mentioned in the comment.`);
    
    Util.pause(2);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);
    
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();

    Util.click(repo.createdPostCommentLink(timestamp)); 
    
    Util.keys('@' + nameOfPrivateGroupWithGeolocation);
    Util.pause(1);
    Util.keys('Enter');
    Util.pause(1);
    Util.keys('Enter');
    Util.takeScreenshot();

    Util.waitForNotDisplayed(repo.geoLocationAddressInCreatedNormalPost(timestamp), 5000);
    Util.takeScreenshot();

  });

  it('verify location is fetched automatically if the group with geolocation enabled is in default recipients', function () {
     
    const timestamp = CustomCommand.getTimestamp();

    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);
    Util.click(repo.feedAndSharingLink);
    Util.click(repo.feedAndSharingToField);
    Util.setValue(repo.feedAndSharingToInputField, nameOfPrivateGroupWithGeolocation);

    Util.pause(3);
    
    Util.click(repo.groupSuggestionGeoLocation(nameOfPrivateGroupWithGeolocation));

    Util.waitForDisplayed(repo.settingsSavedSuccessMessage);

    Util.click(repo.networkLogo);

    // Post creation:
    Util.click(repo.inlineInsertTextField);
    Util.pause(2);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will fetch location automatically.`);
    Util.takeScreenshot();
    // Verification:
    Util.waitForDisplayed(repo.geoLocationAddressInInlineInsert);
    Util.takeScreenshot();
    Util.keys('Escape');
    Util.pause(1);

    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);
    Util.click(repo.feedAndSharingLink);
    Util.click(repo.defaultRecipientGroupCrossIcon(nameOfPrivateGroupWithGeolocation));
    Util.waitForDisplayed(repo.settingsSavedSuccessMessage);
    Util.click(repo.networkLogo);

  });

  it('verify location is removed if group with geolocation enabled is removed from recipient list', function () {
    
    const timestamp = CustomCommand.getTimestamp();
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, nameOfPrivateGroupWithGeolocation);
    Util.pause(5);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(1);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will fetch location automatically.`);
    Util.pause(2); 

    Util.waitForDisplayed(repo.geoLocationAddressInInlineInsert);
    Util.takeScreenshot()
    Util.click(repo.crossIconForRecipientGroupInInlineInsert);
    Util.keys('Escape');
    Util.takeScreenshot();
    Util.waitForNotDisplayed(repo.geoLocationAddressInInlineInsert, 5000);
    Util.keys('Escape');

  });

  it('verify location is not shared in post if the post is shared from draft', function () {

    const timestamp = CustomCommand.getTimestamp();

    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network6Admin1.email);
    Util.pause(5);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(1);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will not fetch location automatically. It will be shared from draft.`);
    Util.waitForDisplayed(repo.savedInDrafts);
    Util.takeScreenshot();
    Util.keys('Escape');
    Util.click(repo.draftsLink);

    Util.click(repo.sharedPostElipses(timestamp));
    Util.takeScreenshot();

    Util.click(repo.postContextMenuShareWithOthersLink);
    Util.pause(2);

    Util.takeScreenshot();
    Util.setValue(repo.shareWithOthersInputField2, nameOfPrivateGroupWithGeolocation);

    Util.pause(4);
    Util.click(repo.suggestedPostRecipient);
    Util.takeScreenshot();
    Util.click(repo.publish);
    Util.waitForDisplayed(repo.updatingSharingInfoSuccessMessage);

    Util.click(repo.networkLogo);

    Util.click(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();

    Util.waitForNotDisplayed(repo.geoLocationAddressInCreatedNormalPost(timestamp), 5000);
    Util.takeScreenshot();
    Util.click(repo.networkLogo);

  });

  it('verify two groups one with geolocation enabled and other without it are added to the post then location can be fetched', function () {

    const timestamp = CustomCommand.getTimestamp(); 

    Util.click(repo.inlineInsertTextField);
    
    Util.click(repo.toInputField);
   
    Util.setValue(repo.typeToInputField, nameOfPrivateGroupWithoutGeolocation);
    Util.pause(3);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(1);

    Util.keys(nameOfPrivateGroupWithGeolocation);
    Util.pause(2);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(1);

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will fetch location automatically.`);
    Util.pause(2); 
    const geoLocationAddressInInlineInsert = Util.getText(repo.geoLocationAddressInInlineInsert);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);
    const geoLocationAddressInCreatedNormalPostText = Util.getText(repo.geoLocationAddressInCreatedNormalPost(timestamp));
    expect(geoLocationAddressInCreatedNormalPostText).toBe(geoLocationAddressInInlineInsert);
    Util.takeScreenshot();

  });

  it('verify group admin can disable location sharing through geolocation icon in inline insert', function () {

    const timestamp = CustomCommand.getTimestamp(); 

    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, nameOfPrivateGroupWithGeolocation);
    Util.pause(5);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(1);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will not fetch location.`);
    Util.pause(2);
    Util.waitForDisplayed(repo.geoLocationAddressInInlineInsert);
    Util.click(repo.locationIconInInlineInsert);
    Util.waitForNotDisplayed(repo.geoLocationAddressInInlineInsert, 5000);

    Util.takeScreenshot();
    Util.click(repo.noteShareButton);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.takeScreenshot();
    Util.waitForNotDisplayed(repo.createdPostWithoutLocation(timestamp));

    Util.click(repo.sharedPostTitle(timestamp));
    Util.click(repo.editButtonPostDetailView);
    Util.takeScreenshot();

    Util.click(repo.locationIconInEditPost);
    Util.waitForDisplayed(repo.geoLocationAddressInPostEditView);
    Util.click(repo.locationIconInEditPost);
    Util.waitForNotDisplayed(repo.geoLocationAddressInPostEditView);
    Util.click(repo.doneButtonPostDetailView);
    Util.waitForNotDisplayed(repo.geoLocationAddressInPostEditView);
    Util.takeScreenshot();
    Util.click(repo.networkLogo);

  });

  it('verify geolocation cannot be updated in edit post other than group admin', function () {
    
  
    Util.setValue(repo.feedSearchInputField, nameOfPrivateGroupWithGeolocation);
    Util.click(repo.groupSuggestionInDetailView(nameOfPrivateGroupWithGeolocation));

    Util.click(repo.elipsesInGroupView);
    Util.click(repo.invitePeopleToThisGroupInGroupViewElipsesMenu);
    Util.click(repo.inviteTeammatesSearchPlaceholderLink);
    Util.pause(3);
    Util.setValue(repo.inviteTeammatesSearchInputField, profile.network6User1.email);
    Util.pause(3);
    Util.takeScreenshot();
    Util.click(repo.userSuggestionGeoLocation(profile.network6User1.email));
    Util.click(repo.inviteButton);
    Util.takeScreenshot();
    //Util.waitForDisplayed(repo.invitationSentMessage);
    //Util.click(repo.invitationSentMessageCrossIcon);

    Util.click(repo.networkLogo);

    const timestamp = CustomCommand.getTimestamp();

    Util.click(repo.inlineInsertTextField);
    
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, nameOfPrivateGroupWithGeolocation);
    Util.click(repo.suggestedPostRecipient);

    Util.keys(profile.network6User1.email);
    Util.pause(2);
    Util.click(repo.suggestedPostRecipient);

    Util.waitForDisplayed(repo.geoLocationAddressInInlineInsert);

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : Geolocation in this post will not be updated.`);

    Util.takeScreenshot();
    Util.click(repo.noteShareButton);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();


    sessionBrowser1 = Util.getBrowserSession();
    browserSessions.push(sessionBrowser1);
    sessionBrowser2 = Util.openBrowser();
    browserSessions.push(sessionBrowser2);
    
    Util.switchToBrowser(sessionBrowser2);

    CustomCommand.login(profile.url, profile.network6User1.email, profile.network6User1.password);
    
    Util.pause(2);
    Util.click(repo.feedSearchInputField);
    Util.keys(nameOfPrivateGroupWithGeolocation);
    Util.pause(1);
    Util.click(repo.groupSuggestionInDetailView(nameOfPrivateGroupWithGeolocation));
    Util.takeScreenshot();

    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.takeScreenshot();
    Util.click(repo.editPostLinkInPostContextMenu);
    Util.pause(2);
    Util.waitForNotDisplayed(repo.geoLocationCrossIconInEditPost);
    Util.waitForDisplayed(repo.disabledGeolocationIconInEditPost);
    Util.takeScreenshot();
    Util.click(repo.doneButtonInPostDetailView);
    Util.waitForDisplayed(repo.editButtonInPostDetailView);
    browser.back();
    browser.back();
  
  });

  it('verify acknowledge and poll post creation with geolocation', function () {


    Util.switchToBrowser(sessionBrowser1);

    const timestamp = CustomCommand.getTimestamp();

    // Poll post creation with geolocation.
    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.pollIcon);
    Util.click(repo.pollwithText);
    Util.setValue(repo.noteTitleInputField, `Test Poll Post: ${timestamp}`);

    Util.setValue(repo.option1, `Text Poll Option 1: Yes`);
    Util.click(repo.addNewChoice);
    Util.setValue(repo.option2, `Text Poll Option 2: No`);

    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, nameOfPrivateGroupWithGeolocation);
    Util.pause(4);
    Util.click(repo.suggestedPostRecipient);
    
    let geoLocationAddressInInlineInsert = Util.getText(repo.geoLocationAddressInInlineInsert);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);

    let geoLocationAddressInCreatedPollPostText = Util.getText(repo.geoLocationAddressInCreatedPollPost(timestamp));
    expect(geoLocationAddressInCreatedPollPostText).toBe(geoLocationAddressInInlineInsert);

    Util.takeScreenshot();
    
    // Acknowledge post creation with geolocation.

    Util.click(repo.inlineInsertTextField);
    Util.setValue(repo.noteTitleInputField, `Test Acknowledge Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This is a test post with geolocation.`);

    Util.click(repo.acknowledgePostCheckbox);
    Util.takeScreenshot();

    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, nameOfPrivateGroupWithGeolocation);
    Util.pause(5);
    Util.click(repo.suggestedPostRecipient);

    Util.pause(2); 

    geoLocationAddressInInlineInsert = Util.getText(repo.geoLocationAddressInInlineInsert);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);
    
    geoLocationAddressInCreatedNormalPostText = Util.getText(repo.geoLocationAddressInCreatedNormalPost(timestamp));
    expect(geoLocationAddressInCreatedNormalPostText).toBe(geoLocationAddressInInlineInsert);
    Util.takeScreenshot();

  });

  it('verify geolocation is not fetched if group admin disables geolocation from group settings', function () {

    const timestamp = CustomCommand.getTimestamp();

    Util.setValue(repo.feedSearchInputField, nameOfPrivateGroupWithGeolocation);
    
    Util.click(repo.groupSuggestionInDetailView(nameOfPrivateGroupWithGeolocation));

    Util.click(repo.elipsesInGroupView);
    Util.click(repo.groupSettingsInGroupViewElipsesMenu);
    Util.click(repo.checkboxShareLocationWithPostContentAutomaticallyInGroupSettings);
    Util.pause(2);
    Util.click(repo.saveChangesButtonInGroupSettings);
    Util.waitForDisplayed(repo.settingsSavedSuccessMessage);
    Util.pause(3);

    Util.click(repo.networkLogo);

    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, nameOfPrivateGroupWithGeolocation);
    Util.pause(2);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(1);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will not fetch location automatically.`);
    Util.pause(2);
    Util.waitForNotDisplayed(repo.geoLocationAddressInInlineInsert);
    Util.takeScreenshot();
    Util.keys('Escape');

    Util.switchToBrowser(sessionBrowser2);
    Util.closeBrowser();
    Util.switchToBrowser(sessionBrowser1);


    
  });

  it('verify location access permission not granted message is displayed in post if location cannot be fetched', function () {

    Util.closeBrowser();
    
    const newSession = browser.newSession({
      'alwaysMatch': {
        'browserName': 'chrome',
        'acceptInsecureCerts': true,
        'goog:chromeOptions': {
          'prefs': {
            'profile.default_content_setting_values.geolocation': 2
          },
          'excludeSwitches': ['enable-automation'],
          'args': ['--start-maximized']
        }
      }
    });

    driver.sessionId = newSession.sessionId;

    CustomCommand.login(profile.url, profile.network6Admin1.email, profile.network6Admin1.password);
    
    const timestamp = CustomCommand.getTimestamp();

    Util.setValue(repo.feedSearchInputField, nameOfPrivateGroupWithGeolocation);    
    Util.click(repo.groupSuggestionInDetailView(nameOfPrivateGroupWithGeolocation));
    Util.click(repo.elipsesInGroupView);
    Util.click(repo.groupSettingsInGroupViewElipsesMenu);
    Util.click(repo.checkboxShareLocationWithPostContentAutomaticallyInGroupSettings);
    Util.pause(2);
    Util.click(repo.saveChangesButtonInGroupSettings);
    Util.waitForDisplayed(repo.settingsSavedSuccessMessage);
    Util.pause(3);

    Util.click(repo.networkLogo);

    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, nameOfPrivateGroupWithGeolocation);
    Util.pause(2);
    Util.click(repo.suggestedPostRecipient);
    Util.takeScreenshot();
    Util.click(repo.cancelButton);
    Util.pause(1);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will not be able to fetch location.`);
    Util.pause(2); 
    Util.waitForNotDisplayed(repo.geoLocationAddressInInlineInsert);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);
    Util.pause(5);
  
    Util.waitForDisplayed(repo.postWithMessageLocationAccessPermissionNotGranted(timestamp));
    Util.takeScreenshot();

  });

  it('remove groups', function () {

    Util.setValue(repo.feedSearchInputField, nameOfPrivateGroupWithGeolocation);
    Util.pause(1);
    Util.click(repo.groupSuggestionInDetailView(nameOfPrivateGroupWithGeolocation));
    Util.click(repo.elipsesInGroupView);
    Util.click(repo.deleteGroup);
    Util.click(repo.deleteButton);
    Util.pause(5);
    Util.waitForDisplayed(repo.inlineInsertTextField);

    Util.setValue(repo.feedSearchInputField, nameOfPrivateGroupWithoutGeolocation);
    Util.pause(1);
    Util.click(repo.groupSuggestionInDetailView(nameOfPrivateGroupWithoutGeolocation));
    Util.click(repo.elipsesInGroupView);
    Util.click(repo.deleteGroup);
    Util.takeScreenshot();
    Util.click(repo.deleteButton);
    Util.pause(5);
    Util.waitForDisplayed(repo.inlineInsertTextField);
    Util.takeScreenshot();
 
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


function navigateToGroupViewThroughGroupCreationPost(groupName) {

  // This function will open the group view through link present in group creation post.
  Util.click(repo.grpPost(groupName));
  
  return true;
}

function sendEmailToGroupEmailAddress(groupEmailAddress) {
  const timestamp = CustomCommand.getTimestamp(); 
  Util.click(repo.composeButtonYahooMail);
  Util.setValue(repo.messageToFieldYahooMail, groupEmailAddress);
  Util.setValue(repo.messageSubjectFieldYahooMail, 'From Mail Client: ' + timestamp);
  Util.setValue(repo.messageBodyFieldYahooMail, 'This is a test email from yahoo mail to group email address');
  Util.click(repo.sendButtonYahooEmail);
  Util.waitForDisplayed(repo.messageSentSuccessMessageYahooMail);
  return timestamp;
}

function signup() {

  browser.url(profile.url);

  Util.pause(5);
  
  Util.click(repo.signupNowLink);
 
  const timestamp = CustomCommand.getTimestamp();
  const convoNetworkDomain = profile.network6Admin1.email.substr(profile.network6Admin1.email.indexOf('@') + 1);
  
  const signupUserEmail = timestamp + '@' + convoNetworkDomain;
 
  Util.pause(3);

  Util.setValue(repo.signupEmailInputField, signupUserEmail);
 
  Util.pause(3);

  Util.click(repo.signupButton);

  const convoDomainURL = profile.url;

  // if match found then verification code will be sent to gmail otherwise code is 1111.

  if (convoDomainURL.includes('app.convo.pk') || convoDomainURL.includes('app.convo.com')) {

    Util.pause(30);

    let signupWindow = Util.getCurrentWindowHandle();
    let yahooMailWindow = openMailClientInNewTabAndSwitch();

    for (let i = 0; i <= 4; i++) {

      if (i === 4) {
        throw new Error('Unable to get verifcation code email.');
      }

      Util.pause(30);
      const verificationCode = readVerificationCodeFromMailClient();
      
      Util.switchToWindow(signupWindow);
      insertVerificationCode(verificationCode);
      
      const verificationPassed = verifyVerificationCodeIsCorrect();
      
      if (verificationPassed) {
        break;
      }

      verificationCodeIsNotCorrectSendCodeAgain();

      Util.switchToWindow(yahooMailWindow);
      Util.refresh();
      Util.pause(3);
      
      continue;

    }

  }else {

    Util.setValue(repo.verificationCodeInputField, '1111');
    Util.pause(1);
    Util.click(repo.verifyButton);
    Util.pause(5);
    const joinAccountText = `//div[@id='joinAccount']/div[2]`;
    expect(Util.getText(joinAccountText).trim()).toBe('Create your profile. This helps your teammates find you.');
   
  }

  const signupUserFirstName = 'Automation';
  const signupUserLastName = 'Tester';
  const signupUserPosition = 'Load Tester';

  Util.setValue(repo.signupFirstNameInputField, signupUserFirstName);
  Util.setValue(repo.signupLastNameInputField, signupUserLastName);
  Util.setValue(repo.signupJobTitleInputField, signupUserPosition);
  Util.setValue(repo.signupPasswordInputField, '123456');

  Util.click(repo.signupNextButton);
  Util.click(repo.signupSkipThisForNowProfilePictureLink);
  Util.click(repo.signupSkipThisForNowGroupCreationLink);

  Util.click(repo.signupGetStartedLink);

  try { Util.click(repo.signupPolicyAcceptButton, 10000); } catch (error) {}

  Util.click(repo.signupCompletionScreenCrossIcon);
  Util.pause(5);
  Util.click(repo.signupClickHereLink);
  Util.pause(5);
  Util.waitForDisplayed(repo.signupConvoGettingStartedPlaylistPost);
  Util.takeScreenshot();

  Util.click(repo.userMenuDropdown);

  // Edit profile.
  Util.click(repo.editProfileLink);

  const loggedInUserEmail = `//p/span[text()='${signupUserEmail}']`;
  Util.waitForDisplayed(loggedInUserEmail);

  const loggedInUserFullName = `//div[@ng-form='editForm']/p[contains(text(),'${signupUserFirstName} ${signupUserLastName}')]`;
  Util.waitForDisplayed(loggedInUserFullName);

  const loggedInUserPostion = `//div[@ng-form='editForm']/p[contains(text(),'${signupUserPosition}')]`;
  Util.waitForDisplayed(loggedInUserPostion);

  return signupUserEmail;

}

function openMailClientInNewTabAndSwitch () {

  // Emails being received in gmail address will be forwarded to yahoo email address. Please check gmail email forward settings.
  // Gmail Email: scrybe.invitations@gmail.com
  // Gmail Password: KitcheN1

  const yahooMailURL = 'https://mail.yahoo.com/';
  const yahooVerificationCodeEmail = 'convo_automation@yahoo.com';
  const yahooVerificationCodePassword = 'Test123!@#';
 
  const yahooMailWindow = Util.openNewTabAndSwitch();

  browser.url(yahooMailURL);
  
  try {
    Util.click(repo.yahooSigninButton, 10000); 
  } catch (error) {
    
  }
  
  Util.setValue(repo.yahooUsernameInputField, yahooVerificationCodeEmail);
  Util.click(repo.yahooSigninNextButton);
  Util.setValue(repo.yahooPasswordInputField, yahooVerificationCodePassword);
  Util.click(repo.yahooPasswordNextButton);
  Util.waitForDisplayed(repo.yahooHomeButton);

  return yahooMailWindow;

}

function readVerificationCodeFromMailClient () {

  const verificationCodeEmailTimeout = 10000;

  const verificationCodeEmailSubject = `(//div/span[contains(text(),'Your verification code is ')])[1]`;
  Util.waitForDisplayed(verificationCodeEmailSubject, verificationCodeEmailTimeout);
   
  const verificationCodeSubjectText = Util.getText(verificationCodeEmailSubject);
  const verificationCode = verificationCodeSubjectText.substr(verificationCodeSubjectText.indexOf('is') + 3);
  
  return verificationCode;
}

function insertVerificationCode (verificationCode) {
  
  Util.clearValue(repo.verificationCodeInputField);
  Util.setValue(repo.verificationCodeInputField, verificationCode);
  Util.pause(1);
  Util.click(repo.verifyButton);

}

function verifyVerificationCodeIsCorrect () {

  try {

    const joinAccountText = `//div[@id='joinAccount']/div[2]`;
    expect(Util.getText(joinAccountText, 10000).trim()).toBe('Create your profile. This helps your teammates find you.');
    return true;
    
  } catch (error) { return false; }
 
}

function verificationCodeIsNotCorrectSendCodeAgain () {

  Util.click(repo.clickHereLinkToResendVerficationCodeEmail);
  const newVerificationCodeSentSuccessMessage = `//span[@class="msg" and text()="We've emailed you a new verification code."]`;
  Util.waitForDisplayed(newVerificationCodeSentSuccessMessage);
}