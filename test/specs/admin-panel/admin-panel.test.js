const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');
const { refresh } = require('../../../utils/utils');

describe('admin panel', function () {

  // Author: Shoaib Arslan Kiyani
  // Total Test Cases: 5

  const blockedDomain = 'yahoo.com';
  const userDomain = profile.network2Admin1.email.match(/[^@]*$/); // returns e.g testsuite11.com from provided email.
  let sessionBrowser1 = null;
  let sessionBrowser2 = null;

  const browserSessions = [];

  it('verify network admin can limit number of network users who can signup', function () {

    const timestamp = CustomCommand.getTimestamp();
    CustomCommand.login(profile.url, profile.network2Admin1.email, profile.network2Admin1.password);
    Util.click(repo.profileImageDropdown);
    Util.click(repo.enterAdminMode);
    Util.pause(10);
    Util.waitForDisplayed(repo.exitAdminMode);
    Util.waitForDisplayed(repo.whatsNew);
    Util.waitForDisplayed(repo.privateGroupsDisplayed);
    Util.click(repo.networkDropdown);
    Util.click(repo.teamDirectory);
    const everyoneGroupUsersCount = Util.getText(repo.everyoneGroupNameHeadingInTeamDirectory).match(/\d+/g).toString();
    console.log('Number of users in everyone group:', everyoneGroupUsersCount);
    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);
    Util.click(repo.manageUsersLinkInNetworkSettings);
    Util.pause(1);
    Util.click(repo.limitNetworkUsersInputField);

    const randomnetworkCap = Math.floor(Math.random() * 900000000).toString();

    Util.pause(3);

    Util.clearValue(repo.limitNetworkUsersInputField);
    Util.setValue(repo.limitNetworkUsersInputField, randomnetworkCap);
    Util.pause(1);
    Util.click(repo.applyNetworkCapButton);
    Util.waitForDisplayed(repo.settingsSavedSuccessMessageInNetworkSettings);
    Util.pause(3);

    Util.click(repo.limitNetworkUsersInputField);
    Util.pause(3);
    Util.clearValue(repo.limitNetworkUsersInputField);
    Util.setValue(repo.limitNetworkUsersInputField, everyoneGroupUsersCount);
    Util.pause(1);
    Util.click(repo.applyNetworkCapButton);
    Util.waitForDisplayed(repo.settingsSavedSuccessMessageInNetworkSettings);
    Util.takeScreenshot();
    Util.click(repo.networkDropdown);
    Util.click(repo.teamDirectory);
    Util.click(repo.inviteTeammatesInputFieldInTeamDirectory);
    const inviteUserEmail = timestamp + '@' + userDomain;
    console.log('Invite user email:', inviteUserEmail);
    Util.setValue(repo.inviteTeammatesInputFieldInTeamDirectory, inviteUserEmail);
    Util.click(repo.inviteButton);
    Util.waitForDisplayed(repo.userCapLimitReachedMessage);
    Util.takeScreenshot();
    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);
    Util.click(repo.manageUsersLinkInNetworkSettings);
    Util.click(repo.limitNetworkUsersInputField);
    Util.pause(3);
    Util.clearValue(repo.limitNetworkUsersInputField);
    Util.pause(3);
    Util.setValue(repo.limitNetworkUsersInputField, 'Unlimited');
    Util.pause(1);
    Util.click(repo.applyNetworkCapButton);
    //  Util.waitForDisplayed(repo.settingsSavedSuccessMessageInNetworkSettings);

  });

  it('verify network admin can update network name', function () {

    const timestamp = CustomCommand.getTimestamp();
    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);
    Util.click(repo.networkNameInputField);
    const existingNetworkName = Util.getText(repo.existnetworkName);
    Util.takeScreenshot();
    console.log('Existing network name:', existingNetworkName);
    Util.keys(['Control', 'a']);
    Util.keys('Backspace');
    Util.setValue(repo.networkNameInputField, timestamp);
    Util.click(repo.networkInformationHeading);
    Util.waitForDisplayed(repo.settingsSavedSuccessMessageInNetworkInformation);
    Util.takeScreenshot();
    const updatedNetworkName = Util.getText(repo.networkName(timestamp));
    console.log('Updated network name:', updatedNetworkName);
    expect(updatedNetworkName).toBe(timestamp);

    // Back to orignal network name.
    Util.click(repo.networkNameInputField);
    Util.keys(['Control', 'a']);
    Util.keys('Backspace');
    Util.setValue(repo.networkNameInputField, existingNetworkName);
    Util.click(repo.networkInformationHeading);
    Util.waitForDisplayed(repo.settingsSavedSuccessMessageInNetworkInformation);

  });

  it('verify network logo can be updated', function () {

    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);

    Util.uploadFile(repo.networkImageUploadInputField, Util.getResourcePath('mario.jpg'));
    Util.waitForDisplayed(repo.networkImageUploadSpinner);
    Util.waitForNotDisplayed(repo.networkImageUploadSpinner);

    const counterRegex = /(\d*)\.jpg/;

    const currentThumbnailCounter = Util.getAttributeValue(repo.networkImageURL, 'src').match(counterRegex)[1];
    console.log('Current network image thumbnail counter:', currentThumbnailCounter);
    Util.takeScreenshot();
    Util.uploadFile(repo.networkImageUploadInputField, Util.getResourcePath('camera.png'));
    Util.waitForDisplayed(repo.networkImageUploadSpinner);
    Util.waitForNotDisplayed(repo.networkImageUploadSpinner);

    const updatedThumbnailCounter = Util.getAttributeValue(repo.networkImageURL, 'src').match(counterRegex)[1];
    console.log('Updated network image thumbnail counter:', updatedThumbnailCounter);
    expect(parseInt(updatedThumbnailCounter)).toBeGreaterThan(parseInt(currentThumbnailCounter));
    Util.takeScreenshot();

    // Back to orignal network image.
    Util.uploadFile(repo.networkImageUploadInputField, Util.getResourcePath('mario.jpg'));
    Util.waitForDisplayed(repo.networkImageUploadSpinner);
    Util.waitForNotDisplayed(repo.networkImageUploadSpinner);
    const updatedAgainThumbnailCounter = Util.getAttributeValue(repo.networkImageURL, 'src').match(counterRegex)[1];
    console.log('Updated again network image thumbnail counter:', updatedAgainThumbnailCounter);
    expect(parseInt(updatedAgainThumbnailCounter)).toBeGreaterThan(parseInt(updatedThumbnailCounter));

  });

  it('verify user domain can be blocked', function () {

    const timestamp = CustomCommand.getTimestamp();
    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);
    Util.click(repo.manageUsersLinkInNetworkSettings);
    Util.click(repo.setUserPrivileges);

    Util.click(repo.unblockButton, 5000, true);

    Util.click(repo.blockUsersInputField);
    Util.setValue(repo.blockUsersInputField, blockedDomain);
    Util.click(repo.blockButtonInNetworkSettings);
    Util.waitForDisplayed(repo.settingsSavedSuccessMessageInUserPrivileges);

    Util.click(repo.networkDropdown);
    Util.click(repo.teamDirectory);
    Util.click(repo.inviteTeammatesInputFieldInTeamDirectory);
    const inviteUserEmail = timestamp + '@' + userDomain;
    console.log('Invite user email:', inviteUserEmail);
    Util.setValue(repo.inviteTeammatesInputFieldInTeamDirectory, timestamp + '@' + blockedDomain);
    Util.click(repo.inviteButton);

    Util.waitForDisplayed(repo.inviteBlockedMessage);
    Util.takeScreenshot();

    // Back to domain unblocked.
    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);
    Util.click(repo.manageUsersLinkInNetworkSettings);
    Util.click(repo.setUserPrivileges);

    Util.click(repo.domainUnblockLink(blockedDomain));

    Util.waitForDisplayed(repo.settingsSavedSuccessMessageInUserPrivileges);

  });

  xit('verify network admin can view content of network users in admin mode', function () {

    // Admin User.
    const browserSession1 = Util.getBrowserSession();

    // Network User.
    const browserSession2 = Util.openBrowser();

    Util.switchToBrowser(browserSession2);

    // Login Network User.
    CustomCommand.login(profile.url, profile.network2User1.email, profile.network2User1.password);
    const timestamp = CustomCommand.getTimestamp();

    // Create private group for network user.
    //const privateGroupNameOfNetworkUser = CustomCommand.createPrivateGroup(timestamp);
    //console.log('Network user private group name:', privateGroupNameOfNetworkUser);

    // Create a post with private group as recipient.

    // Network user creates a text post.
    Util.click(repo.inlineInsertTextField);
    const postTitle = `Test Post: ${timestamp}`;
    Util.setValue(repo.noteTitleInputField, postTitle);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This is a test post for admin mode.`);
    Util.pause(2);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network2User2.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    let sharedPostTitle = `//div/a/span[contains(text(), 'Test Post: ${timestamp}')]`;
    Util.waitForDisplayed({ sharedPostTitle });

    // Check whether created post is indexed.
    Util.setValue(repo.feedSearchInputField, `"${postTitle}"`);
    Util.click(repo.searchIcon);

    //  const indexedPostPathInSearchResult = verifyPostIndexing(timestamp);

    for (let i = 0; i < 10; i++) {

      const sharedPostPathInSearchResults = `//div/a/span/span[text()='${timestamp}']`;
      const postIndexed = Util.isDisplayed({ sharedPostPathInSearchResults });

      console.log('Post Indexing Status:', postIndexed);

      if (postIndexed) {
        Util.takeScreenshot();
        break;
      }

      Util.refresh();
      Util.pause(30);
    }

    // Admin User.
    Util.switchToBrowser(browserSession1);


    // Search private group of network user without admin mode.

    Util.click(repo.networkLogo);

    Util.click(repo.exitAdminMode);

    // Search posts from network user 1 without admin mode.
    Util.click(repo.feedSearchDropdownIcon);
    Util.waitForDisplayed(repo.feedSearchFilters);
    Util.click(repo.feedFilterFromDropdown);
    Util.pause(2);
    Util.keys(profile.network2User1.email);
    const fromUserFilterSuggestion = `//span/b[text()='${profile.network2User1.email}']`;
    Util.click({ fromUserFilterSuggestion });
    Util.waitForDisplayed(repo.feedViewFeedItemsCount);
    const createdPostByUser1NotDisplayedToAdmin = Util.isDisplayed({ sharedPostTitle });
    Util.takeScreenshot();
    expect(createdPostByUser1NotDisplayedToAdmin).toBe(false);

    // Enter network admin mode.
    Util.click(repo.profileImageDropdown);
    Util.click(repo.enterAdminModeLink);

    // Search posts from network user 1 with admin mode.
    Util.click(repo.feedSearchDropdownIcon);
    Util.waitForDisplayed(repo.feedSearchFilters);
    Util.click(repo.feedFilterFromDropdown);
    Util.pause(2);
    Util.keys(profile.network2User1.email);
    Util.click({ fromUserFilterSuggestion });
    Util.waitForDisplayed(repo.feedViewFeedItemsCount);
    const createdPostByUser1DisplayedToAdmin = Util.isDisplayed({ sharedPostTitle });
    Util.takeScreenshot();
    expect(createdPostByUser1DisplayedToAdmin).toBe(true);

    Util.switchToBrowser(browserSession2);
    Util.closeBrowser();

    Util.switchToBrowser(browserSession1);

  });

  it('verify manage post permission section in admin panel', function () {
    Util.click(repo.manageContentLinkInNetworkSettings);
    Util.click(repo.contentPreferencesTab);
    Util.waitForDisplayed(repo.managePostPermissionsHeading);
    Util.waitForDisplayed(repo.managePostPermisionHeadingText);

  });

  it('verify dropdown list is shown infront of set default post permission text ', function () {
    Util.waitForDisplayed(repo.setDefaultPermissionInManagePost);
    Util.click(repo.postPermissionDropdownIcon);
    Util.waitForDisplayed(repo.postPermissionDropdownMenu);
    Util.waitForDisplayed(repo.canEditAndCommentOptionInDefaultPermissionDropdown);
    Util.waitForDisplayed(repo.commentOnlyOptionInDefaultPermissionDropdown);
    Util.waitForDisplayed(repo.viewOnlyOptionInDefaultPermissionDropdown);
    Util.click(repo.comentOnlyOptionInPostPermissionDropdown);
    Util.waitForDisplayed(repo.changeSetDefaultPermissionInManagePost);
    Util.click(repo.networkLogo);
    Util.refresh();
    Util.waitForDisplayed(repo.whatsNew);
    Util.waitForDisplayed(repo.privateGroupsDisplayed);
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputFieldIcon);
    Util.waitForDisplayed(repo.commentOnlyWithTickOptionInToInputFeildDropdown);
    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);
    Util.click(repo.manageContentLinkInNetworkSettings);
    Util.click(repo.contentPreferencesTab);
    Util.click(repo.postPermissionDropdownIcon);
    Util.click(repo.canEditAndCommentOptionInPostPermissionDropdown);
    Util.waitForDisplayed(repo.setDefaultPermissionInManagePost);

  });

  it('verify admin user can check /uncheck the share post ', function () {
    const timestamp = CustomCommand.getTimestamp();
    Util.waitForDisplayed(repo.allowRecipientToSharePostCheckedCheckbox);
    Util.click(repo.allowRecipientToSharePostCheckedCheckbox);
    Util.click(repo.postPermissionDropdownIcon);
    Util.click(repo.canEditAndCommentOptionInPostPermissionDropdown);
    Util.waitForDisplayed(repo.setDefaultPermissionInManagePost);
    Util.click(repo.networkLogo);
    Util.refresh();
    Util.waitForDisplayed(repo.whatsNew);
    Util.waitForDisplayed(repo.privateGroupsDisplayed);
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network2User1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post is for network and admin users.`);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.click(repo.sharedPostElipses(timestamp));
    Util.waitForDisplayed(repo.shareWithOthers);
    Util.takeScreenshot();
    sessionBrowser1 = Util.getBrowserSession();
    browserSessions.push(sessionBrowser1);
    sessionBrowser2 = Util.openBrowser();
    browserSessions.push(sessionBrowser2);
    Util.switchToBrowser(sessionBrowser2);
    CustomCommand.login(profile.url, profile.network2User1.email, profile.network2User1.password);
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.click(repo.sharedPostElipses(timestamp));
    Util.waitForNotDisplayed(repo.shareWithOthers);
    Util.switchToBrowser(sessionBrowser1);
    Util.pause(5);
    Util.click(repo.networkDropdown);
    Util.click(repo.networkSettingsLinkInNetworkDropdown);
    Util.click(repo.manageContentLinkInNetworkSettings);
    Util.click(repo.contentPreferencesTab);
    Util.click(repo.allowRecipientToSharePostCheckbox);
    Util.waitForDisplayed(repo.allowRecipientToSharePostCheckbox);
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


// Maximum duration for post indexing is 5 Mins.

function verifyPostIndexing(postTimestamp) {

  for (let i = 0; i < 11; i++) {

    if (i === 10) {
      throw new Error(`Post indexing is not working. Post with timestamp ${postTimestamp} is not indexed.`);
    }

    const sharedPostPathInSearchResults = `//div/a/span/span[text()='${postTimestamp}']`;
    const postIndexed = Util.isDisplayed({ sharedPostPathInSearchResults });

    console.log('Post Indexing Status:', postIndexed);

    if (postIndexed) {
      Util.takeScreenshot();
      break;
    }

    Util.refresh();
    Util.pause(30);
  }

  return sharedPostPathInSearchResults;

}