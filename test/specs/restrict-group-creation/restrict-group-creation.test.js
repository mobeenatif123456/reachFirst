const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('restrict-group-creation', function() {

  let browserSession1 = null;
  let browserSession2 = null;
  let browserSession3 = null;

  const browserSessions = [];

  it('verify if admin clicks on "Allow only specific members to create groups" checkbox then only admin can create groups', function() {

    CustomCommand.login(profile.url, profile.network6Admin1.email, profile.network6Admin1.password);
    
    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);
    Util.click(repo.manageGroupsLinkInNetworkSettings);
    Util.takeScreenshot();

    const groupCreatorFullName = profile.network6User1.firstName + ' ' + profile.network6User1.lastName; 

    if(Util.waitForDisplayed(repo.disabledUsersList,10000,true))
    {

      Util.click(repo.allowOnlySpecificMembersToCreateGroupsCheckbox);
      Util.takeScreenshot();

      Util.moveTo(repo.userOneGroup(groupCreatorFullName),5000,true);
      Util.click(repo.userOneRemoveButtonGroup(groupCreatorFullName),5000,true);

      Util.pause(5);

    }

    else{

      Util.moveTo(repo.userOneGroup(groupCreatorFullName),5000,true);
      Util.click(repo.userOneRemoveButtonGroup(groupCreatorFullName),5000,true);
      Util.pause(5);

    }

    Util.click(repo.networkLogo);

    const timestamp = CustomCommand.getTimestamp();
    CustomCommand.createPrivateGroup(timestamp);


    Util.click(repo.grpPost(timestamp));

    Util.click(repo.groupToggleDropdown(timestamp));
    Util.pause(3);
    Util.click(repo.deleteGroup);
    Util.pause(1);
    Util.takeScreenshot();
    Util.click(repo.deleteButton);
    Util.pause(3);

    Util.waitForDisplayed(repo.myFeed);
    Util.click(repo.myFeed);

    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);
    Util.click(repo.manageGroupsLinkInNetworkSettings);

    browserSession1 = Util.getBrowserSession();

    browserSessions.push(browserSession1);
    
  });

  it('verify if admin restricts group creation for all users then add group icon is not dispalyed to normal network users', function() {

    browserSession2 = Util.openBrowser();

    browserSessions.push(browserSession2);

    Util.switchToBrowser(browserSession2);

    CustomCommand.login(profile.url, profile.network6User1.email, profile.network6User1.password);
    Util.waitForDisplayed(repo.privateHeadingTextUnderGroupsChannels);
    Util.waitForNotDisplayed(repo.addGroupIcon);

  });

  it('verify if admin allows group creation for a certain network user then add group icon is displayed to that user', function() {

    Util.switchToBrowser(browserSession1);
    Util.click(repo.groupCreatorsAddButton);

    Util.pause(5);

    const groupCreatorFullName = profile.network6User1.firstName + ' ' + profile.network6User1.lastName;  
    Util.setValue(repo.groupCreatorsInputField, groupCreatorFullName);
    
    Util.click(repo.groupCreatorUserSuggestion(groupCreatorFullName));
    
    Util.waitForDisplayed(repo.userPresentInGroupCreatorsList(groupCreatorFullName));

    Util.switchToBrowser(browserSession2);

    Util.refresh();

    Util.waitForDisplayed(repo.whatsNew);
    Util.waitForDisplayed(repo.privateGroupsDisplayed);

    Util.waitForDisplayed(repo.privateHeadingTextUnderGroupsChannels);
    Util.waitForDisplayed(repo.addGroupIcon);

  });

  it('verify if admin revokes group creation for an added user then add group icon is not displayed to that user', function() {

    Util.switchToBrowser(browserSession1);
    
    const groupCreatorFullName = profile.network6User1.firstName + ' ' + profile.network6User1.lastName;  
    Util.click(repo.userOneAvatarGroup(groupCreatorFullName));

    Util.click(repo.removeUsersButtonInManageGroups);

    Util.waitForNotDisplayed(repo.userPresentInGroupCreatorsList(groupCreatorFullName));

    Util.switchToBrowser(browserSession2);

    Util.refresh();

    Util.waitForDisplayed(repo.whatsNew);

    Util.waitForDisplayed(repo.privateGroupsDisplayed);

    Util.waitForNotDisplayed(repo.addGroupIcon);

  });

  it('verify admin can remove added user in manage groups secion by hovering over the added user and click remove button', function() {

    Util.switchToBrowser(browserSession1);

    Util.click(repo.groupCreatorsAddButton);

    Util.pause(5);

    const groupCreatorFullName = profile.network6User1.firstName + ' ' + profile.network6User1.lastName;  
    Util.setValue(repo.groupCreatorsInputField, groupCreatorFullName);
    
    Util.click(repo.groupCreatorUserSuggestion(groupCreatorFullName));
    
    Util.waitForDisplayed(repo.userPresentInGroupCreatorsList(groupCreatorFullName));

    Util.switchToBrowser(browserSession2);

    Util.refresh();

    Util.waitForDisplayed(repo.addGroupIcon);

    Util.switchToBrowser(browserSession1);

    Util.moveTo(repo.userPresentInGroupCreatorsList(groupCreatorFullName));
    Util.takeScreenshot();

    Util.click(repo.userOneRemoveButtonGroup(groupCreatorFullName));
    Util.waitForNotDisplayed(repo.userPresentInGroupCreatorsList(groupCreatorFullName));

    Util.switchToBrowser(browserSession2);

    Util.refresh();

    Util.waitForDisplayed(repo.whatsNew);
    
    Util.waitForDisplayed(repo.privateGroupsDisplayed);

    Util.waitForNotDisplayed(repo.addGroupIcon);

  });

  it('verify if a network user added to manage groups is removed from network then that user is also removed from manage groups', function() {

    browserSession3 = Util.openBrowser();

    browserSessions.push(browserSession3);

    Util.switchToBrowser(browserSession3);
    
    const {signupUserEmail, signupUserFirstName, signupUserLastName} = CustomCommand.signupUserOnExistingNetworkWithoutProfilePicAndGroupCreation();

    Util.switchToBrowser(browserSession1);
    
    Util.refresh();

    Util.click(repo.groupCreatorsAddButton);

    Util.pause(5);

    const groupCreatorFullName = signupUserFirstName + ' ' + signupUserLastName;  
    Util.setValue(repo.groupCreatorsInputField, groupCreatorFullName);
    Util.click(repo.groupCreatorUserSuggestion(groupCreatorFullName));
    Util.waitForDisplayed(repo.userPresentInGroupCreatorsList(groupCreatorFullName));
    Util.takeScreenshot();

    Util.switchToBrowser(browserSession3);
    Util.click(repo.networkDropdown);
    Util.click(repo.teamDirectory);
    Util.setValue(repo.teamDirectorySearchForPeopleInputField, signupUserEmail);
    
    Util.click(repo.loggedInUserElipsesInTeamDirectory(signupUserEmail));
    Util.click(repo.removeFromNetwork);
    Util.takeScreenshot();
    Util.click(repo.leaveNetworkButton);
    Util.waitForDisplayed(repo.loginButtonOnSignoutPage);

    Util.closeBrowser();
    Util.switchToBrowser(browserSession2);
    Util.closeBrowser();
    
    Util.switchToBrowser(browserSession1);
    Util.refresh();
    Util.waitForNotDisplayed(repo.userPresentInGroupCreatorsList(groupCreatorFullName));
    Util.takeScreenshot();
    Util.click(repo.allowOnlySpecificMembersToCreateGroupsCheckbox);

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