const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');
const { myFeed } = require('../../../object-repository/object-repo');

describe('group settings', function () {

  // Author: Mobeen Atif
  // Total Test Cases: 05
  
  let nameOfPrivateGroupWithGeolocation = null;
  let nameOfPrivateGroupWithoutGeolocation = null;
  let timestamp = null;
  let timestamp2 = null;

  let sessionBrowser1 = null;
  let sessionBrowser2 = null;

  const browserSessions = [];

  it('add multiple group admins and check access right of changing grp type', function () {

    CustomCommand.login(profile.url, profile.network4Admin1.email, profile.network4Admin1.password);
    
    timestamp = CustomCommand.getTimestamp();

    nameOfPrivateGroupWithGeolocation = CustomCommand.createPrivateGroup(timestamp,profile.network4User1.email);
    
    Util.pause(3);

    Util.takeScreenshot();
    navigateToGroupViewThroughGroupCreationPost(nameOfPrivateGroupWithGeolocation);
    Util.click(repo.elipsesInGroupView);
    Util.click(repo.groupSettingsInGroupViewElipsesMenu);
    Util.takeScreenshot();

    Util.waitForDisplayed(repo.members);
    Util.click(repo.members);

    const requestedUser = `//div[@class='details-wrapper']/span/a[contains(text(),'${profile.network4User1.firstName} ${profile.network4User1.lastName}')]`;
    Util.waitForDisplayed(requestedUser);

    const requestedUserDropdown = `//div[@class='details-wrapper']/span/a[contains(text(),'${profile.network4User1.firstName} ${profile.network4User1.lastName}')]/../../../div[@class="drop-down"]/cnv-dropdowns/span/a/i`;
    Util.waitForDisplayed(requestedUserDropdown);

    Util.click(requestedUserDropdown);

    Util.waitForDisplayed(repo.makeAdmin);
    Util.click(repo.makeAdmin);

    Util.waitForDisplayed(repo.makeAdminButton);
    Util.click(repo.makeAdminButton);

    Util.waitForDisplayed(repo.settings);
    Util.click(repo.settings);

    const adminVerify = `//li[@class='tag-item user']//span[@class='pill-text' and contains(text(),'${profile.network4Admin1.firstName} ${profile.network4Admin1.lastName}')]`;
    Util.waitForDisplayed(adminVerify);

    const adminVerify2 = `//li[@class='tag-item user']//span[@class='pill-text' and contains(text(),'${profile.network4User1.firstName} ${profile.network4User1.lastName}')]`;
    Util.waitForDisplayed(adminVerify2);

    Util.waitForDisplayed(repo.publicGroup);
    Util.click(repo.publicGroup);

    Util.click(repo.saveChangesButtonInGroupSettings);
    Util.waitForDisplayed(repo.settingsSavedSuccessMessage);
    Util.pause(2);

    Util.click(repo.networkLogo);

    navigateToGroupViewThroughGroupCreationPost(nameOfPrivateGroupWithGeolocation);

    const publicGrp = `//div[@class='group-members-widget-wrapper']//span[contains(text(),'Public Group')]`;
    Util.waitForDisplayed(publicGrp);


    sessionBrowser1 = Util.getBrowserSession();

    browserSessions.push(sessionBrowser1);

    sessionBrowser2 = Util.openBrowser();

    browserSessions.push(sessionBrowser2);
    
    Util.switchToBrowser(sessionBrowser2);

    CustomCommand.login(profile.url, profile.network4User1.email, profile.network4User1.password);
    
    Util.pause(2);

    navigateToGroupViewThroughGroupCreationPost(nameOfPrivateGroupWithGeolocation);

    Util.click(repo.elipsesInGroupView);
    Util.click(repo.groupSettingsInGroupViewElipsesMenu);
    Util.takeScreenshot();

    Util.waitForDisplayed(repo.privateGroupSettings);
    Util.click(repo.privateGroupSettings);

    Util.click(repo.saveChangesButtonInGroupSettings);
    Util.waitForDisplayed(repo.settingsSavedSuccessMessage);
    Util.pause(2);

    Util.click(repo.networkLogo);

    navigateToGroupViewThroughGroupCreationPost(nameOfPrivateGroupWithGeolocation);

    const privateGrp = `//div[@class='group-members-widget-wrapper']//span[contains(text(),'Private Group')]`;
    Util.waitForDisplayed(privateGrp);

    Util.waitForDisplayed(repo.myFeed);

    Util.click(repo.myFeed);

    Util.switchToBrowser(sessionBrowser1);

   
  });

  it('add multiple group admins and check access right of grp name changing', function () {

    Util.click(repo.elipsesInGroupView);
    Util.click(repo.groupSettingsInGroupViewElipsesMenu);
    Util.takeScreenshot();

    timestamp2 = CustomCommand.getTimestamp();

    Util.clearValue(repo.groupNameSettings);
    Util.setValue(repo.groupNameSettings,timestamp2);

    
    Util.click(repo.saveChangesButtonInGroupSettings);
    Util.waitForDisplayed(repo.settingsSavedSuccessMessage);
    Util.pause(2);

    Util.click(repo.networkLogo);

    Util.refresh();

    Util.click(repo.seeMorePrivate,5000,true);

    const changedNameGroup = `//li//div//a[contains(text(),'${timestamp2}')]`;
    Util.waitForDisplayed(changedNameGroup);

    Util.switchToBrowser(sessionBrowser2);

    Util.refresh();

    Util.click(repo.seeMorePrivate,5000,true);

    Util.waitForDisplayed(changedNameGroup);

    Util.click(changedNameGroup);

    Util.click(repo.elipsesInGroupView);
    Util.click(repo.groupSettingsInGroupViewElipsesMenu);
    Util.takeScreenshot();

    Util.clearValue(repo.groupNameSettings);
    Util.setValue(repo.groupNameSettings,timestamp);

    Util.click(repo.saveChangesButtonInGroupSettings);
    Util.waitForDisplayed(repo.settingsSavedSuccessMessage);
    Util.pause(2);

    Util.click(repo.networkLogo);
    
    Util.refresh();

    Util.click(repo.seeMorePrivate,5000,true);

    const changedNameGroup2 = `//li//div//a[contains(text(),'${timestamp}')]`;
    Util.waitForDisplayed(changedNameGroup2);

    Util.switchToBrowser(sessionBrowser1);

    Util.refresh();

    Util.click(repo.seeMorePrivate,5000,true);

    Util.waitForDisplayed(changedNameGroup2);

  });

  it('changed group type by admin visible to other group members', function () {

    timestamp = CustomCommand.getTimestamp();

    nameOfPrivateGroupWithGeolocation = CustomCommand.createPrivateGroup(timestamp,profile.network4User1.email);

    Util.pause(3);

    Util.takeScreenshot();
    navigateToGroupViewThroughGroupCreationPost(nameOfPrivateGroupWithGeolocation);
    Util.click(repo.elipsesInGroupView);
    Util.click(repo.groupSettingsInGroupViewElipsesMenu);
    Util.takeScreenshot();

    Util.waitForDisplayed(repo.publicGroup);
    Util.click(repo.publicGroup);

    Util.click(repo.saveChangesButtonInGroupSettings);
    Util.waitForDisplayed(repo.settingsSavedSuccessMessage);
    Util.pause(2);

    Util.click(repo.networkLogo);

    navigateToGroupViewThroughGroupCreationPost(nameOfPrivateGroupWithGeolocation);

    const publicGrp = `//div[@class='group-members-widget-wrapper']//span[contains(text(),'Public Group')]`;
    Util.waitForDisplayed(publicGrp);

    Util.switchToBrowser(sessionBrowser2);

    navigateToGroupViewThroughGroupCreationPost(nameOfPrivateGroupWithGeolocation);
    Util.waitForDisplayed(publicGrp);

    Util.waitForDisplayed(repo.myFeed);

    Util.click(repo.myFeed);

    Util.switchToBrowser(sessionBrowser1);

  });

  it('group name changed by admin visible to other users', function () {

    Util.click(repo.elipsesInGroupView);
    Util.click(repo.groupSettingsInGroupViewElipsesMenu);
    Util.takeScreenshot();

    timestamp2 = CustomCommand.getTimestamp();

    Util.clearValue(repo.groupNameSettings);
    Util.setValue(repo.groupNameSettings,timestamp2);

    
    Util.click(repo.saveChangesButtonInGroupSettings);
    Util.waitForDisplayed(repo.settingsSavedSuccessMessage);
    Util.pause(2);

    Util.click(repo.networkLogo);

    Util.refresh();
    
    Util.click(repo.seeMorePublic,5000,true);

    const changedNameGroup = `//li//div//a[contains(text(),'${timestamp2}')]`;
    Util.waitForDisplayed(changedNameGroup);

    Util.switchToBrowser(sessionBrowser2);

    Util.refresh();

    Util.click(repo.seeMorePublic,5000,true);

    Util.waitForDisplayed(changedNameGroup);

    Util.switchToBrowser(sessionBrowser1);


  });

  it('delete the group', function () {

    const changedNameGroup = `//li//div//a[contains(text(),'${timestamp2}')]`;
    Util.waitForDisplayed(changedNameGroup);

    Util.click(changedNameGroup);

    Util.click(repo.elipsesInGroupView);
    Util.click(repo.groupSettingsInGroupViewElipsesMenu);
    Util.takeScreenshot();

    Util.waitForDisplayed(repo.deleteGroupSettings);
    Util.click(repo.deleteGroupSettings);

    Util.waitForDisplayed(repo.deleteButtonSettings);
    Util.click(repo.deleteButtonSettings);

    Util.click(repo.seeMorePublic,5000,true);

    Util.waitForNotDisplayed(changedNameGroup);


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

  const createGroupLinkInPost = `//span[contains(text(),'has created the ')]/a[text()='${groupName}']`;
  Util.click(createGroupLinkInPost);
  
  return true;
}