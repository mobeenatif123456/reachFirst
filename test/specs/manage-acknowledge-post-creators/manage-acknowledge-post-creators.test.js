const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('manage-acknowledge-post-creators', function() {

  let sessionBrowser1 = null; // Admin User.
  let sessionBrowser2 = null; // Network User 1.
  let sessionBrowser3 = null; // Network User 2.

  const browserSessions = [];

  it('verify only admin can create acknowledge posts if "allow only specific members" ... checkbox is checked and no user is added', function() {

    CustomCommand.login(profile.url, profile.network9Admin1.email, profile.network9Admin1.password);

    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);
    Util.click(repo.manageContentLinkInNetworkSettings);
    Util.click(repo.contentPreferencesTab);
    Util.waitForDisplayed(repo.manageAcknowledgePostCreatorsHeading);


    const ackPostCreatorFullName1 = profile.network9User1.firstName + ' ' + profile.network9User1.lastName; 
    const ackPostCreatorFullName2 = profile.network9User2.firstName + ' ' + profile.network9User2.lastName; 
    
    if(Util.waitForDisplayed(repo.acknowledgePostCreatorsUsersListDisabled,10000,true))
    {

      Util.click(repo.allowOnlySpecificMembersCheckbox);

      Util.takeScreenshot();

      Util.click(repo.managePostPermissionsHeading);

      Util.keys('End');

      Util.keys('End');

      Util.pause(5);

      Util.moveTo(repo.userOne(ackPostCreatorFullName1),5000,true);

      Util.click(repo.userOneRemoveButton(ackPostCreatorFullName1),5000,true);

      Util.moveTo(repo.userTwo(ackPostCreatorFullName2),5000,true);

      Util.click(repo.userTwoRemoveButton(ackPostCreatorFullName2),5000,true);

    }

    else{

      Util.click(repo.managePostPermissionsHeading);

      Util.keys('End');

      Util.keys('End');

      Util.pause(5);

      Util.moveTo(repo.userOne(ackPostCreatorFullName1),5000,true);

      Util.click(repo.userOneRemoveButton(ackPostCreatorFullName1),5000,true);

      Util.moveTo(repo.userTwo(ackPostCreatorFullName2),5000,true);

      Util.click(repo.userTwoRemoveButton(ackPostCreatorFullName2),5000,true);


    }

    Util.click(repo.networkLogo);

    const timestamp = CustomCommand.getTimestamp();    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network9User1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post by automation suite.`);
    Util.pause(2);
    Util.click(repo.acknowledgmentCheckbox);
    Util.click(repo.noteShareButton);
    Util.waitForDisplayed(repo.ackPostCreated(timestamp));

    sessionBrowser1 = Util.getBrowserSession();
    browserSessions.push(sessionBrowser1);
    sessionBrowser2 = Util.openBrowser();
    browserSessions.push(sessionBrowser2);
    
    Util.switchToBrowser(sessionBrowser2);
    CustomCommand.login(profile.url, profile.network9User1.email, profile.network9User1.password);
    Util.waitForDisplayed(repo.acknowledgePostCreatedForUserOne(timestamp));
    Util.click(repo.inlineInsertTextField);
    Util.waitForNotDisplayed(repo.recipientsMustAcknowledgeToViewThePostCheckbox);

  });

  it('verify admin can add network user to manage acknowledgement post creators and then that user can create acknowledge posts', function() {
    
    Util.keys('Escape');
    Util.switchToBrowser(sessionBrowser1);

    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);
    Util.click(repo.manageContentLinkInNetworkSettings);
    Util.click(repo.contentPreferencesTab);
    Util.waitForDisplayed(repo.manageAcknowledgePostCreatorsHeading);

    Util.click(repo.managePostPermissionsHeading);

    Util.keys('End');

    Util.keys('End');

    Util.pause(5);

    Util.click(repo.acknowledgePostCreatorAddButton);

    Util.pause(5);
    
    const networkUser1FullName = profile.network9User1.firstName + ' ' + profile.network9User1.lastName;
    Util.setValue(repo.acknowledgePostCreatorInputField, networkUser1FullName);
    
    Util.click(repo.user1Suggestion(networkUser1FullName));

    Util.waitForDisplayed(repo.user1InAcknowledgePostCreatorsList(networkUser1FullName));
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser2);

    const timestamp = CustomCommand.getTimestamp();    
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network9User2.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp} : This is a test post by automation suite.`);
    Util.pause(2);
    Util.click(repo.acknowledgmentCheckbox);
    Util.takeScreenshot();
    Util.click(repo.noteShareButton);
    Util.waitForDisplayed(repo.ackPostCreated(timestamp));
    
    sessionBrowser3 = Util.openBrowser();
    browserSessions.push(sessionBrowser3);

    Util.switchToBrowser(sessionBrowser3);

    CustomCommand.login(profile.url, profile.network9User2.email, profile.network9User2.password);
    
    Util.waitForDisplayed(repo.acknowledgePostCreatedForUserTwo(timestamp));

    Util.click(repo.inlineInsertTextField);
    Util.waitForNotDisplayed(repo.recipientsMustAcknowledgeToViewThePostCheckbox);

  });

  it('verify multiple users can be added and removed from acknowledgement post creators', function() {

    Util.keys('Escape');
    Util.switchToBrowser(sessionBrowser1);

    Util.click(repo.acknowledgePostCreatorAddButton);
    
    Util.pause(5);

    const networkUser2FullName = profile.network9User2.firstName + ' ' + profile.network9User2.lastName;
    Util.setValue(repo.acknowledgePostCreatorInputField, networkUser2FullName);
    
    Util.click(repo.user2Suggestion(networkUser2FullName));

    Util.waitForDisplayed(repo.user2InAcknowledgePostCreatorsList(networkUser2FullName));
    Util.takeScreenshot();

    const networkUser1FullName = profile.network9User1.firstName + ' ' + profile.network9User1.lastName;
    Util.click(repo.user1Avatar(networkUser1FullName));
    
    Util.click(repo.user2Avatar(networkUser2FullName));
    Util.takeScreenshot();

    Util.click(repo.removeUsersButtonInManageAcknowledgementPostCreators);
    Util.refresh();
    Util.click(repo.contentPreferencesTab);
    Util.waitForDisplayed(repo.manageAcknowledgePostCreatorsHeading);

    Util.click(repo.managePostPermissionsHeading);

    Util.keys('End');

    Util.keys('End');

    Util.pause(5);

    Util.waitForNotDisplayed(repo.user1InAcknowledgePostCreatorsList(networkUser1FullName));
    
    Util.waitForNotDisplayed(repo.user2InAcknowledgePostCreatorsList(networkUser2FullName));
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser2);

    Util.click(repo.inlineInsertTextField);
    Util.waitForNotDisplayed(repo.recipientsMustAcknowledgeToViewThePostCheckbox);
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser3);

    Util.click(repo.inlineInsertTextField);
    Util.waitForNotDisplayed(repo.recipientsMustAcknowledgeToViewThePostCheckbox);
    Util.takeScreenshot();

    Util.closeBrowser();
    Util.switchToBrowser(sessionBrowser2);
    Util.closeBrowser();
    Util.switchToBrowser(sessionBrowser1);

  });

  it('verify on moving mouse over the user added in acknowledgement post creators remove link is shown', function() {

    Util.click(repo.acknowledgePostCreatorAddButton);

    Util.pause(5);

    const networkUser1FullName = profile.network9User1.firstName + ' ' + profile.network9User1.lastName;
    Util.setValue(repo.acknowledgePostCreatorInputField, networkUser1FullName);
    
    Util.click(repo.user1Suggestion(networkUser1FullName));

    Util.waitForDisplayed(repo.user1InAcknowledgePostCreatorsList(networkUser1FullName));
    Util.moveTo(repo.user1InAcknowledgePostCreatorsList(networkUser1FullName));
    Util.waitForDisplayed(repo.user1RemoveLink(networkUser1FullName));
    
  });

  it('verify duplicate users cannot be addded in acknowledgement post creators', function() {

    Util.click(repo.acknowledgePostCreatorAddButton);

    Util.pause(5);

    const networkUser1FullName = profile.network9User1.firstName + ' ' + profile.network9User1.lastName;
    Util.setValue(repo.acknowledgePostCreatorInputField, networkUser1FullName);
    
    Util.waitForDisplayed(repo.user1AddedText(networkUser1FullName));
    Util.takeScreenshot();
    Util.keys('Escape');

    Util.click(repo.acknowledgePostCreatorAddButton);
    
    const networkUser2FullName = profile.network9User2.firstName + ' ' + profile.network9User2.lastName;
    Util.setValue(repo.acknowledgePostCreatorInputField, networkUser2FullName);

    Util.click(repo.user2Suggestion(networkUser2FullName));
    
  });

  it('verify added users in acknowledgement post creators list can be searched', function() {

    const networkUser1FullName = profile.network9User1.firstName + ' ' + profile.network9User1.lastName;
    const networkUser2FullName = profile.network9User2.firstName + ' ' + profile.network9User2.lastName;
    
    Util.pause(5);

    Util.setValue(repo.acknowledgePostCreatorsSearchListInputField, networkUser1FullName);

    Util.waitForDisplayed(repo.searchedUser(networkUser1FullName));
  //  Util.waitForNotDisplayed({networkUser2FullName});
    Util.takeScreenshot();

    Util.clearValue(repo.acknowledgePostCreatorsSearchListInputField);

    Util.click(repo.user1Avatar(networkUser1FullName));
    Util.click(repo.user2Avatar(networkUser2FullName));

    Util.click(repo.removeUsersButtonInManageAcknowledgementPostCreators);
    Util.refresh();
    Util.click(repo.contentPreferencesTab);
    Util.waitForDisplayed(repo.manageAcknowledgePostCreatorsHeading);

    Util.waitForNotDisplayed(repo.user1InAcknowledgePostCreatorsList(networkUser1FullName));
    Util.waitForNotDisplayed(repo.user2InAcknowledgePostCreatorsList(networkUser2FullName));

    Util.click(repo.allowOnlySpecificMembersCheckbox);

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