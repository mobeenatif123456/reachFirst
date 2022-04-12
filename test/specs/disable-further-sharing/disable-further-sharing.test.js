const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('disable further sharing', function () {

  // Author: Shoaib Arslan Kiyani
  // Testcases: 6

  let browserSessionFirstUser;
  let browserSessionSecondUser;
  let firstPrivateGroupName;
  let secondPrivateGroupName;

  const browserSessions = [];

  it('verify post permission "Can edit and comments" with and without "Enable Sharing" in post detail view', function () {

    // Login first user.
    CustomCommand.login(profile.url, profile.network1User1.email, profile.network1User1.password);

    // Post timestamp
    const timestamp = CustomCommand.getTimestamp();

    // Create post with provided permission and enable sharing selected.
    const sharedPostTitle = createPostWithPermissionAndEnableSharing('Can edit and comments', profile.network1User2.email, timestamp);

    // Browser session first user.
    browserSessionFirstUser = Util.getBrowserSession();

    browserSessions.push(browserSessionFirstUser);

    // Open second browser.
    browserSessionSecondUser = Util.openBrowser();

    browserSessions.push(browserSessionSecondUser);
    
    // Switch to second user.
    Util.switchToBrowser(browserSessionSecondUser);

    // Login second user.
    CustomCommand.login(profile.url, profile.network1User2.email, profile.network1User2.password);

    // Create two private groups and add first user as group member.
    firstPrivateGroupName = CustomCommand.createPrivateGroup(CustomCommand.getTimestamp(), profile.network1User1.email);
    console.log('First private group name:', firstPrivateGroupName);

    secondPrivateGroupName = CustomCommand.createPrivateGroup(CustomCommand.getTimestamp(), profile.network1User1.email);
    console.log('Second private group name:', secondPrivateGroupName);

    // Open shared post in detail view.
    Util.takeScreenshot();
    Util.click(repo.sharedPostTitle(timestamp));

    // Mention group in edit post view.
    sharePostWithGroupInPostEditView(firstPrivateGroupName, 'detailed view', timestamp);

    // Mention group in comment section of the post.
    sharePostWithGroupInCommentSection(secondPrivateGroupName, 'detailed view', timestamp);

    // Mention user through 'Share this' icon.
    sharePostWithUserThroughSharethis(profile.network1User3, 'detailed view', timestamp);

    // Switch to first user.
    Util.switchToBrowser(browserSessionFirstUser);

    // Disable 'Enable Sharing'.
    disableEnableSharing();

    // Switch to second user.
    Util.switchToBrowser(browserSessionSecondUser);

    // Verify group cannot be mentioned in comment section.
    Util.click(repo.postCommentArea);
    Util.setValue(repo.postCommentInputField, '@');
    Util.waitForDisplayed(repo.commentSectionDisabledFurtherSharingMessage);

    // Verify recipient cannot be added through edit post.
    Util.click(repo.editButtonPostDetailView);
    Util.waitForDisplayed(repo.editPostSectionDisabledFurtherSharingMessage);
    Util.takeScreenshot();
    Util.click(repo.doneButtonInPostDetailView);

    // Verify 'Share this' icon is not present.
    Util.waitForNotDisplayed(repo.shareThis, 2000);

    Util.click(repo.networkLogo);
    Util.switchToBrowser(browserSessionFirstUser);
    Util.click(repo.networkLogo);

  });

  it('verify post permission "Comment only" with and without "Enable Sharing" in post detail view', function () {

    // Login first user.
    // CustomCommand.login(profile.url, profile.network1User1.email, profile.network1User1.password);
    
    // Post timestamp
    const timestamp = CustomCommand.getTimestamp();

    // Create post with provided permission and enable sharing selected.
    const sharedPostTitle = createPostWithPermissionAndEnableSharing('Comment only', profile.network1User2.email,  timestamp);

    // Browser session first user.
    // browserSessionFirstUser = Util.getBrowserSession();
    // Open second browser.
    // browserSessionSecondUser = Util.openBrowser();

    // Switch to second user.
    Util.switchToBrowser(browserSessionSecondUser);

    // Login second user.
    // CustomCommand.login(profile.url, profile.network1User2.email, profile.network1User2.password);
    // Util.switchToBrowser(browserSessionSecondUser);

    // Create private groups. // change later
    // let secondPrivateGroupName = CustomCommand.createPrivateGroup(CustomCommand.getTimestamp(), profile.network1User1.email);

    // Open shared post in detail view.
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();
    Util.click(repo.sharedPostTitle(timestamp));

    // Verify recipient cannot added through edit post.
    Util.waitForDisplayed(repo.thisPostIsClosedForEditingText);

    // Mention group in comment section of the post.
    sharePostWithGroupInCommentSection(secondPrivateGroupName, 'detailed view', timestamp);

    // Mention user through 'Share this' icon.
    sharePostWithUserThroughSharethis(profile.network1User3, 'detailed view', timestamp);

    // Switch to first user.
    Util.switchToBrowser(browserSessionFirstUser);

    // Disable 'Enable Sharing'.
    disableEnableSharing();

    // Switch to second user.
    Util.switchToBrowser(browserSessionSecondUser);

    // Verify group cannot be mentioned in comment section.
    Util.click(repo.postCommentArea);
    Util.setValue(repo.postCommentInputField, '@');
    Util.waitForDisplayed(repo.commentSectionDisabledFurtherSharingMessage);

    // Verify 'Share this' icon is not present.
    Util.waitForNotDisplayed(repo.shareThis, 2000);
    Util.takeScreenshot();

    Util.click(repo.networkLogo);
    Util.switchToBrowser(browserSessionFirstUser);
    Util.click(repo.networkLogo);

  });

  it('verify post permission "View only" with and without "Enable Sharing" in post detail view', function () {

    // Login first user.
    // CustomCommand.login(profile.url, profile.network1User1.email, profile.network1User1.password);

    // Post timestamp
    const timestamp = CustomCommand.getTimestamp();

    // Create post with provided permission and enable sharing selected.
    const sharedPostTitle = createPostWithPermissionAndEnableSharing('View only', profile.network1User2.email, timestamp);
    
    // Browser session first user.
    // browserSessionFirstUser = Util.getBrowserSession();
    // Open second browser.
    // browserSessionSecondUser = Util.openBrowser();

    // Switch to second user.
    Util.switchToBrowser(browserSessionSecondUser);

    // Login second user.
    // CustomCommand.login(profile.url, profile.network1User2.email, profile.network1User2.password);

    // Open shared post in detail view.
    Util.takeScreenshot();
    Util.click(repo.sharedPostTitle(timestamp));

    // Mention user through 'Share this' icon.
    sharePostWithUserThroughSharethis(profile.network1User3, 'detailed view', timestamp);

    // Switch to first user.
    Util.switchToBrowser(browserSessionFirstUser);

    // Disable enable sharing.
    disableEnableSharing();

    // Switch to second user.
    Util.switchToBrowser(browserSessionSecondUser);

    // Verify post is closed for editing.
    Util.waitForDisplayed(repo.thisPostIsClosedForEditingText);

    // Verify group cannot be mentioned in comment section.
    Util.waitForDisplayed(repo.commentsAreClosedForThisPostText);

    // Verify 'Share this' icon is not present.
    Util.waitForNotDisplayed(repo.shareThis, 2000);
    Util.takeScreenshot();
    
    Util.click(repo.networkLogo);
    Util.switchToBrowser(browserSessionFirstUser);
    Util.click(repo.networkLogo);

  });

  it('verify post permission "Can edit and comments" with and without "Enable Sharing" in feed view', function () {

    // Login first user.
    // CustomCommand.login(profile.url, profile.network1User1.email, profile.network1User1.password);

    // Post timestamp
    const timestamp = CustomCommand.getTimestamp();

    // Create post with provided permission and enable sharing selected.
    const sharedPostTitle = createPostWithPermissionAndEnableSharing('Can edit and comments', profile.network1User2.email, timestamp);
    
    // Browser session first user.
    // browserSessionFirstUser = Util.getBrowserSession();
    // Open second browser.
    // browserSessionSecondUser = Util.openBrowser();

    // Switch to second user.
    Util.switchToBrowser(browserSessionSecondUser);

    // Login second user.
    // CustomCommand.login(profile.url, profile.network1User2.email, profile.network1User2.password);

    // Create two private groups and add first user as group member.
    // firstPrivateGroupName = CustomCommand.createPrivateGroup(CustomCommand.getTimestamp(), profile.network1User1.email);
    // console.log('First private group name:', firstPrivateGroupName);

    // secondPrivateGroupName = CustomCommand.createPrivateGroup(CustomCommand.getTimestamp(), profile.network1User1.email);
    // console.log('Second private group name:', secondPrivateGroupName);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    // Mention group in comment section of the post in feed view.
    sharePostWithGroupInCommentSection(firstPrivateGroupName, 'feed view', timestamp);

    // Mention user through 'Share this' link in post context menu.
    sharePostWithUserThroughSharethis(profile.network1User3, 'feed view', timestamp);

    // Mention user through 'Edit post' link in post context menu.
    sharePostWithGroupInPostEditView(secondPrivateGroupName, 'feed view', timestamp);

    Util.click(repo.networkLogo);
    
    // Switch to first user.
    Util.switchToBrowser(browserSessionFirstUser);

    // Disable 'Enable Sharing'
    disableEnableSharing();

    // Switch to second user.
    Util.switchToBrowser(browserSessionSecondUser);

    // Verify group cannot be mentioned in comment section of the post in feed view.
    Util.click(repo.createdPostCommentLink(timestamp));
    Util.keys('@');
    Util.waitForDisplayed(repo.commentSectionDisabledFurtherSharingMessage);

    // Verify 'Share this' link is not present in post context menu.
    Util.click(repo.sharedPostElipses(timestamp));
    Util.waitForNotDisplayed(repo.postContextMenuShareWithOthersLink);

    // Verify recipient cannot be added through edit post link in post context menu.
    Util.click(repo.editPostLinkInPostContextMenu);
    Util.waitForDisplayed(repo.editPostSectionDisabledFurtherSharingMessage);
    Util.takeScreenshot();
    Util.click(repo.doneButtonInPostDetailView);

    Util.click(repo.networkLogo);
    Util.switchToBrowser(browserSessionFirstUser);
    Util.click(repo.networkLogo);
    
  });

  it('verify post permission "Comment only" with and without "Enable Sharing" in feed view', function () {

    // Login first user.
    // CustomCommand.login(profile.url, profile.network1User1.email, profile.network1User1.password);

    // Post timestamp
    const timestamp = CustomCommand.getTimestamp();

    // Create post with provided permission and enable sharing selected.
    const sharedPostTitle = createPostWithPermissionAndEnableSharing('Comment only', profile.network1User2.email, timestamp);
    
    // Browser session first user.
    // browserSessionFirstUser = Util.getBrowserSession();
    // Open second browser.
    // browserSessionSecondUser = Util.openBrowser();

    // Switch to second user.
    Util.switchToBrowser(browserSessionSecondUser);

    // Login second user.
    // CustomCommand.login(profile.url, profile.network1User2.email, profile.network1User2.password);
    // Create private groups. // change later
    // let firstPrivateGroupName = CustomCommand.createPrivateGroup(CustomCommand.getTimestamp(), profile.network1User1.email);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();

    // Mention group in comment section of the post in feed view.
    sharePostWithGroupInCommentSection(firstPrivateGroupName, 'feed view', timestamp);

    // Mention user through 'Share this' link in post context menu.
    sharePostWithUserThroughSharethis(profile.network1User3, 'feed view', timestamp);

    // Verify recipient cannot be added through edit post link in post context menu.
    Util.click(repo.sharedPostElipses(timestamp));
    Util.waitForDisplayed(repo.editPostLinkDisabledInPostContextMenu);
    
    // Switch to first user.
    Util.switchToBrowser(browserSessionFirstUser);

    // Disable 'Enable Sharing'
    disableEnableSharing();

    // Switch to second user.
    Util.switchToBrowser(browserSessionSecondUser);

    // Verify group cannot be mentioned in comment section.
    Util.click(repo.createdPostCommentLink(timestamp));
    Util.keys('@');
    Util.waitForDisplayed(repo.commentSectionDisabledFurtherSharingMessage);

    // Verify 'Share this' icon is not present. 
    Util.click(repo.sharedPostElipses(timestamp));
    Util.waitForNotDisplayed(repo.postContextMenuShareWithOthersLink);

    Util.click(repo.networkLogo);
    Util.switchToBrowser(browserSessionFirstUser);
    Util.click(repo.networkLogo);

  });

  it('verify post permission "View only" with and without "Enable Sharing" in feed view', function () {

    // Login first user.
    // CustomCommand.login(profile.url, profile.network1User1.email, profile.network1User1.password);
    
    // Post timestamp
    const timestamp = CustomCommand.getTimestamp();

    // Create post with provided permission and enable sharing selected.
    const sharedPostTitle = createPostWithPermissionAndEnableSharing('View only', profile.network1User2.email, timestamp);
   
    // Browser session first user.
    // browserSessionFirstUser = Util.getBrowserSession();
    // Open second browser.
    // browserSessionSecondUser = Util.openBrowser();
    
    // Switch to second user.
    Util.switchToBrowser(browserSessionSecondUser);

    // Login second user.
    // CustomCommand.login(profile.url, profile.network1User2.email, profile.network1User2.password);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.takeScreenshot();

    // Mention user through 'Share this' link in post context menu.
    sharePostWithUserThroughSharethis(profile.network1User3, 'feed view', timestamp);

    // Verify group cannot be mentioned in comment section.
    Util.click(repo.createdPostCommentLink(timestamp));
    Util.keys('@');
    Util.waitForDisplayed(repo.commentsAreClosedForThisPostTextEnableSharing(timestamp));

    // Switch to first user.
    Util.switchToBrowser(browserSessionFirstUser);

    // Disable 'Enable Sharing'
    disableEnableSharing();

    // Switch to second user.
    Util.switchToBrowser(browserSessionSecondUser);

    // Verify 'Share this' link is not present in post context menu.
    Util.click(repo.sharedPostElipses(timestamp));
    Util.waitForNotDisplayed(repo.postContextMenuShareWithOthersLink);

    // Verify recipient cannot be added through edit post.
    Util.waitForDisplayed(repo.editPostLinkDisabledInPostContextMenu);
    Util.takeScreenshot();


    Util.setValue(repo.feedSearchInputField, firstPrivateGroupName);
    Util.pause(2);
    Util.takeScreenshot();

    Util.click(repo.groupSuggestion(firstPrivateGroupName));

    Util.click(repo.groupToggleDropdown(firstPrivateGroupName));
    Util.pause(3);
    Util.click(repo.deleteGroup);
    Util.pause(1);
    Util.takeScreenshot();
    Util.click(repo.deleteButton);
    Util.pause(5);


    Util.setValue(repo.feedSearchInputField, secondPrivateGroupName);
    Util.pause(2);
    Util.takeScreenshot();

    Util.click(repo.groupSuggestion(secondPrivateGroupName));

    Util.click(repo.groupToggleDropdown(secondPrivateGroupName));
    Util.pause(3);
    Util.click(repo.deleteGroup);
    Util.pause(1);
    Util.takeScreenshot();
    Util.click(repo.deleteButton);
    Util.pause(5);

    Util.closeBrowser();
    Util.switchToBrowser(browserSessionFirstUser);

  });

  
  function createPostWithPermissionAndEnableSharing(postPermission, postRecipient, postTimestamp) {
    
    // Create and share a post with second user.
    
    Util.click(repo.inlineInsertTextField);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${postTimestamp}`);
    Util.setValue(repo.noteBodyInputField, `${postTimestamp}: This is a test post by automation suite.`);
    Util.pause(2);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, postRecipient);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.click(repo.postPermissionOptionsDropdown);

    if (postPermission === 'Can edit and comments') {

      // Check whether 'can edit and comments' permission is already selected and if not select it for the post.
      
      const canEditAndCommentspermissionAlreadySelected = Util.waitForDisplayed(repo.canEditAndCommentsPermissionSelected, 3000, true);
      
      if (!canEditAndCommentspermissionAlreadySelected) {
        Util.click(repo.canEditAndCommentsLinkInInlineInsertDropdown);
        Util.click(repo.postPermissionOptionsDropdown);
      }
    
    }

    if (postPermission === 'Comment only') {

      // Check whether 'Comment only' permission is already selected and if not select it for the post.

      const commentOnlypermissionAlreadySelected = Util.waitForDisplayed(repo.commentOnlyPermissionSelected, 3000, true);

      if (!commentOnlypermissionAlreadySelected) {
        Util.click(repo.commentOnlyLinkInInlineInsertDropdown);
        Util.click(repo.postPermissionOptionsDropdown);
      }

    }

    if (postPermission === 'View only') {

      // Check whether 'can edit and comments' permission is already selected and if not select it for the post.
      const viewOnlypermissionAlreadySelected = Util.waitForDisplayed(repo.viewOnlyPermissionSelected, 3000, true);
      
      if (!viewOnlypermissionAlreadySelected) {
        Util.click(repo.viewOnlyLinkInInlineInsertDropdown);
        Util.click(repo.postPermissionOptionsDropdown);
      }

    }

    // Check whether 'enable sharing' permission is already selected and if not select it.

    const enableSharingPermissionAlreadySelected = Util.waitForDisplayed(repo.enableSharingPermissionSelected, 3000, true);
    
    if (!enableSharingPermissionAlreadySelected) {
      Util.click(repo.enableSharingLinkInInlineInsertDropdown);
      Util.click(repo.postPermissionOptionsDropdown);
    }

    Util.takeScreenshot();
    Util.click(repo.postPermissionOptionsDropdown);
    Util.click(repo.noteShareButton);
    Util.pause(5);
    const sharedTitlePost = `//div/a/span[contains(text(), 'Test Post: ${postTimestamp}')]`;
    Util.waitForDisplayed(repo.sharedPostTitle(postTimestamp));
    Util.pause(2);
    Util.click(repo.sharedPostTitle(postTimestamp));
    Util.pause(5);
    Util.takeScreenshot();
    Util.waitForDisplayed(repo.editButtonPostDetailView);
    return sharedTitlePost;

  }

  function sharePostWithGroupInPostEditView(privateGroupName, view, postTimestamp) {

    if (view === 'detailed view') {
      Util.click(repo.editButtonPostDetailView);
    }

    if (view === 'feed view') {
      Util.click(repo.sharedPostElipses(postTimestamp));
      Util.click(repo.editPostLinkInPostContextMenu);
    }

    // Mention second group as recipient in edit post view.

   
    Util.waitForDisplayed(repo.doneButtonInPostDetailView);
    Util.click(repo.postRecipientFieldInEditPostView);
    Util.pause(2);
    Util.keys(privateGroupName);
    Util.click(repo.groupSuggestionEnableSharing(privateGroupName));
    Util.waitForDisplayed(repo.mentionedGroupInDetail(privateGroupName));
    Util.takeScreenshot();
    Util.click(repo.doneButtonInPostDetailView);
    Util.waitForDisplayed(repo.editButtonPostDetailView);

  }

  function sharePostWithGroupInCommentSection(groupName, view, postTimestamp) {

    // Mention group in comment section.

    if (view === 'detailed view') {
      Util.click(repo.postCommentArea);
      Util.setValue(repo.postCommentInputField, ('@' + groupName));
    }

    if (view === 'feed view') {
      Util.click(repo.createdPostCommentLink(postTimestamp));
      Util.keys('@' + groupName);
    }
    
    Util.click(repo.groupSuggestionEnableSharing(groupName));
    Util.takeScreenshot();
    Util.keys('Enter');
    Util.waitForDisplayed(repo.mentionedFirstGroup(groupName));
    Util.takeScreenshot();

  }

  function sharePostWithUserThroughSharethis(postRecipient, view, postTimestamp) {

    if (view === 'detailed view') {
      Util.click(repo.shareThis);
      Util.pause(2);

    }

    if (view === 'feed view') {
      Util.click(repo.sharedPostElipses(postTimestamp));
      Util.click(repo.postContextMenuShareWithOthersLink);
    }

    Util.keys(postRecipient.email);
    const postSharedWithUserName = postRecipient.firstName + ' ' + postRecipient.lastName;
    Util.click(repo.shareWithOthersUserSuggestion(postSharedWithUserName));
    Util.takeScreenshot();
    Util.click(repo.publish);
  
    view === 'detailed view' ? Util.waitForDisplayed(repo.shared) : Util.waitForDisplayed(repo.updatingSharingInfoSuccessMessage);
    Util.takeScreenshot();

  }

  function disableEnableSharing() {

    Util.click(repo.more);
    Util.moveTo(repo.permissionLinkInMoreMenuBar);
    Util.click(repo.enableSharingLinkUnderPermissionsMenuInPostDetailedView);
    Util.click(repo.more);
    Util.moveTo(repo.permissionLinkInMoreMenuBar);
    Util.takeScreenshot();
    Util.click(repo.more);

  }

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