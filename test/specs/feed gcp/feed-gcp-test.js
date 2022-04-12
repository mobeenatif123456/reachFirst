const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');
const { muteIconInPost } = require('../../../object-repository/object-repo');

describe('feed', function() {

  // Author: Shoaib Arslan Kiyani
  // Testcases: 15

  let sessionBrowser1 = null;
  let sessionBrowser2 = null;
  let postCommentText = null;

  const browserSessions = [];

  it('verify user can perform scroll on feed items', function() {

    CustomCommand.login(profile.url, profile.network2Admin1.email, profile.network2Admin1.password);
    
    const postCountBeforeUserScroll = Util.getElementsCount(repo.postInFeedView);
    console.log('Post count before user scroll:', postCountBeforeUserScroll);

    Util.click(repo.getCompanyInviteLink);

    Util.keys('End');

    Util.waitForNotDisplayed(repo.spinnerForFeedLoading);

    Util.pause(10);

    Util.keys('End');
    
    Util.waitForNotDisplayed(repo.spinnerForFeedLoading);

    Util.pause(10);
   
    const postCountAfterUserScroll = Util.getElementsCount(repo.postInFeedView);
    console.log('Post count after user scroll:', postCountAfterUserScroll);
    
    expect(postCountAfterUserScroll).toBeGreaterThan(postCountBeforeUserScroll);

  });

  it('verify new posts banner shown if user scrolls down and new post arrives', function() {

    const timestamp = CustomCommand.getTimestamp();

    sessionBrowser1 = Util.getBrowserSession();
    browserSessions.push(sessionBrowser1);
    sessionBrowser2 = Util.openBrowser();
    browserSessions.push(sessionBrowser2);
    
    Util.switchToBrowser(sessionBrowser2);

    CustomCommand.login(profile.url, profile.network2User1.email, profile.network2User1.password);

    Util.click(repo.inlineInsertTextField);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This is a test post for new posts banner.`);
    Util.pause(2); 
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network2Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.switchToBrowser(sessionBrowser1);

    Util.pause(10);

    Util.waitForDisplayed(repo.newPostsBanner);
    Util.takeScreenshot();
    Util.click(repo.newPostsBanner);
    Util.pause(2);
    
  });

  it('verify new posts banner shown if user scrolls down and new post arrives having comment', function() {

    const timestamp = CustomCommand.getTimestamp();

    const postCountBeforeUserScroll = Util.getElementsCount(repo.postInFeedView);
    console.log('Post count before user scroll:', postCountBeforeUserScroll);
    Util.click(repo.getCompanyInviteLink);
    
    Util.keys('End');

    Util.waitForNotDisplayed(repo.spinnerForFeedLoading);

    Util.pause(10);

    Util.keys('End');
    
    Util.waitForNotDisplayed(repo.spinnerForFeedLoading);

    Util.pause(10);
    const postCountAfterUserScroll = Util.getElementsCount(repo.postInFeedView);
    console.log('Post count after user scroll:', postCountAfterUserScroll);
    
    Util.switchToBrowser(sessionBrowser2);

    Util.click(repo.inlineInsertTextField);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This is a test post for new posts banner.`);
    Util.pause(2); 
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network2Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.click(repo.createdPostCommentLink(timestamp)); 
    
    Util.keys(`${timestamp}: Test Comment.`);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.commentOnCreatedPost(timestamp));
   
    Util.switchToBrowser(sessionBrowser1);

    Util.waitForDisplayed(repo.newPostsBanner);
    Util.takeScreenshot();
    Util.click(repo.newPostsBanner);
    Util.waitForDisplayed(repo.commentOnCreatedPost(timestamp));
    
  });

  it('verify user can edit post in real time', function() {

    const timestamp = CustomCommand.getTimestamp();
    Util.click(repo.inlineInsertTextField);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    const postContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
    const postBodyText = `${timestamp}: ${postContent}`;
    Util.setValue(repo.noteBodyInputField, postBodyText);
    Util.pause(2); 
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network2User1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.click(repo.sharedPostTitle(timestamp));

    Util.switchToBrowser(sessionBrowser2);
    Util.click(repo.sharedPostTitle(timestamp));

    Util.switchToBrowser(sessionBrowser1);
    Util.click(repo.editButtonPostDetailView);
    Util.waitForDisplayed(repo.doneButtonPostDetailView);
    // Cursor will be focused in post body at the end of the current post content.
    Util.keys(' Edited.');
    Util.click(repo.doneButtonPostDetailView);
    Util.waitForDisplayed(repo.editButtonPostDetailView);
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser2);
    Util.waitForDisplayed(repo.editedNowTimestampForPost);
    const postTextInEditedPost = Util.getText(repo.postTextInPostDetailsView);
    expect(postTextInEditedPost).toBe(`${postBodyText} Edited.`);

  });

  it('verify user can add comment in real time', function() {

    const timestamp = CustomCommand.getTimestamp();

    Util.switchToBrowser(sessionBrowser1);
    Util.click(repo.postCommentArea);
    // Cursor will be focused in post comment section.
    postCommentText = `${timestamp}: Realtime post comment verification.`;
    Util.keys(postCommentText);
    Util.keys('Enter');
    Util.waitForDisplayed(repo.createdCommentInPost(postCommentText));
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser2);
    Util.waitForDisplayed(repo.createdCommentInPost(postCommentText));

  });

  it('verify user can edit comment in real time', function() {

    Util.switchToBrowser(sessionBrowser1);
    Util.moveTo(repo.createdCommentInPost(postCommentText));
    Util.click(repo.commentElipses(postCommentText));
    Util.click(repo.editCommentLinkPostDetailView);
    // Cursor will be focused in post comment section at the end of already created comment.
    Util.keys(' Edited.');
    Util.keys('Enter');
    Util.waitForDisplayed(repo.updatedCommentInPost(postCommentText));
    Util.waitForDisplayed(repo.editedNowTimestampForComment(postCommentText));
    Util.takeScreenshot();
    Util.switchToBrowser(sessionBrowser2);
    Util.waitForDisplayed(repo.updatedCommentInPost(postCommentText));
    Util.waitForDisplayed(repo.editedNowTimestampForComment(postCommentText));

  });

  it('verify user can like the post in real time', function() {

    Util.switchToBrowser(sessionBrowser1);
    Util.click(repo.likeButtonInPostDetailView);
    Util.waitForDisplayed(repo.unlikeButton);
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser2);
    expect(Util.getText(repo.postLikedByUserName)).toBe(`${profile.network2Admin1.firstName} ${profile.network2Admin1.lastName}`);
    
  });

  it('verify user can unlike the post in real time', function() {

    Util.switchToBrowser(sessionBrowser1);
    Util.click(repo.unlikeButton);
    Util.waitForDisplayed(repo.likeButtonInPostDetailView);
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser2);
    Util.waitForNotDisplayed(repo.postLikedByUserName, 5000);

  });

  it('verify user can add tags to post in real time', function() {

    Util.switchToBrowser(sessionBrowser1);
    Util.click(repo.addTagsButtonInPostDetailView);
    Util.setValue(repo.tagInputField, 'MyTag');
    Util.keys('Enter');
    Util.click(repo.doneButtonOnTagPost);
    Util.pause(2);
    Util.waitForDisplayed(repo.tagVerification);
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser2);
    Util.waitForDisplayed(repo.tagVerification);

  });

  it('verify user can remove comment in real time', function() {

    Util.switchToBrowser(sessionBrowser1);
    Util.moveTo(repo.updatedCommentInPost(postCommentText));
    Util.click(repo.updatedCommentElipses(postCommentText));
    Util.click(repo.deleteCommentLinkPostDetailView);
    Util.takeScreenshot();
    Util.click(repo.deleteButton);
    Util.takeScreenshot();

    Util.switchToBrowser(sessionBrowser2);
    Util.waitForNotDisplayed(repo.updatedCommentInPost(postCommentText), 5000);
    
  });

  it('verify by default "can edit and comment" post permission is selected', function() {

    Util.switchToBrowser(sessionBrowser1);
    Util.click(repo.more);
    Util.moveTo(repo.permissionLinkInMoreMenuBar);
    Util.moveTo(repo.canEditAndCommentLinkInPostDetailView);
    Util.waitForDisplayed(repo.canEditAndCommentLinkInPostDetailViewSelected, 5000);

  });

  it('verify "comment only" post permission is working fine', function() {

    Util.moveTo(repo.commentOnlyLinkInPostDetailView);
    Util.takeScreenshot();
    Util.click(repo.commentOnlyLinkInPostDetailView);
    Util.waitForDisplayed(repo.permissionsUpdatedSuccessMessage);
    
    Util.switchToBrowser(sessionBrowser2);
    Util.waitForDisplayed(repo.thisPostIsClosedForEditingText);

  });

  it('verify "view only" post permission is working fine', function() {

    Util.switchToBrowser(sessionBrowser1);
    Util.click(repo.more);
    Util.moveTo(repo.permissionLinkInMoreMenuBar);
    Util.moveTo(repo.viewOnlyLinkInPostDetailView);
    Util.takeScreenshot();
    Util.click(repo.viewOnlyLinkInPostDetailView);
    Util.waitForDisplayed(repo.permissionsUpdatedSuccessMessage);

    Util.switchToBrowser(sessionBrowser2);
    Util.waitForDisplayed(repo.thisPostIsClosedForEditingText);
    Util.waitForDisplayed(repo.commentsAreClosedForThisPostText);

  });
  
  it('verify more and less links for post content are working and post can be viewed from open post link', function() {

    Util.closeBrowser();
    Util.switchToBrowser(sessionBrowser1);
    Util.click(repo.networkLogo);
    const timestamp = CustomCommand.getTimestamp();
    Util.click(repo.inlineInsertTextField);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    const postContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
    Util.setValue(repo.noteBodyInputField, `${timestamp}: ${postContent}`);
    Util.pause(2); 
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField,profile.network2Admin1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.click(repo.moreLinkWithPostContent(timestamp));
    Util.takeScreenshot();

    Util.click(repo.lessLinkWithPostContent(timestamp));
    Util.takeScreenshot();

    Util.click(repo.moreLinkWithPostContent(timestamp));

    Util.click(repo.openPostLinkWithPostContent(timestamp));

    Util.waitForDisplayed(repo.editButtonInPostDetailView);
  
  });

  it('Verify that in feed menu opens a new options window', function() {
    
    Util.click(repo.networkLogo);
    Util.waitForDisplayed(repo.whatsNew);
    const timestamp = CustomCommand.getTimestamp();
    Util.click(repo.inlineInsertTextField);
    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    const postContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
    const postBodyText = `${timestamp}: ${postContent}`;
    Util.setValue(repo.noteBodyInputField, postBodyText);
    Util.pause(2); 
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network2User1.email);
    Util.click(repo.suggestedPostRecipient);
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);
    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.click(repo.sharedPostElipses(timestamp));
    Util.waitForDisplayed(repo.SharedPostDropdown);
    Util.waitForDisplayed(repo.openPostLinkInPostContextMenu);
    Util.waitForDisplayed(repo.editPostLinkInPostContextMenu);
    Util.waitForDisplayed(repo.permissionsLinkInPostContextMenu);
    Util.waitForDisplayed(repo.muteNotificationsLinkInPostContextMenu);
    Util.waitForDisplayed(repo.addTagsLinkInPostContextMenu);
    Util.waitForDisplayed(repo.starThisPostLinkInPostContextMenu);
    Util.waitForDisplayed(repo.shareWithOthers);
    Util.waitForDisplayed(repo.copyLink);
    Util.waitForDisplayed(repo.deletePostLinkInPostContextMenu);
    Util.click(repo.openPostLinkInPostContextMenu);
    Util.waitForDisplayed(repo.openPostInDetailView(timestamp));
    Util.click(repo.networkLogo);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.click(repo.editPostLinkInPostContextMenu);
    Util.waitForDisplayed(repo.doneButtonPostDetailView);
    // Cursor will be focused in post body at the end of the current post content.
    Util.keys(' Edited.');
    Util.click(repo.doneButtonPostDetailView);
    Util.waitForDisplayed(repo.editButtonPostDetailView);
    Util.waitForDisplayed(repo.editedNowTimestampForPost);
    const postTextInEditedPost = Util.getText(repo.postTextInPostDetailsView);
    expect(postTextInEditedPost).toBe(`${postBodyText} Edited.`);
    Util.click(repo.networkLogo);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.moveTo(repo.permissionsLinkInPostContextMenu);
    Util.pause(2); 
    Util.moveTo(repo.commentOnlyLinkInPostContextMenu);
    Util.pause(2); 
    Util.click(repo.commentOnlyLinkInPostContextMenu);
    Util.waitForDisplayed(repo.permissionsUpdatedSuccessMessage);
    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.click(repo.muteNotificationsLinkInPostContextMenu);
    Util.waitForDisplayed(repo.muteIconInPost(timestamp));
    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.waitForDisplayed(repo.unmuteNotificationsLinkInPostContextMenu);
    Util.click(repo.unmuteNotificationsLinkInPostContextMenu);
    Util.waitForNotDisplayed(repo.muteIconInPost(timestamp));
    Util.pause(5);
    //Util.click(repo.networkLogo);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.click(repo.addTagsLinkInPostContextMenu);
    Util.setValue(repo.tagInputField, 'MyTag');
    Util.keys('Enter');
    Util.click(repo.doneButtonOnTagPost);
    Util.waitForDisplayed(repo.addedTagText(timestamp));
    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.click(repo.starThisPostLinkInPostContextMenu);
    Util.pause(2);
    Util.waitForDisplayed(repo.starIconInPost(timestamp));
    Util.click(repo.sharedPostElipses(timestamp));
    Util.waitForDisplayed(repo.unstarThisPostLinkInPostContextMenu);
    Util.click(repo.unstarThisPostLinkInPostContextMenu);
    Util.waitForNotDisplayed(repo.starIconInPost(timestamp));
    Util.pause(5);
    //Util.click(repo.networkLogo);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.click(repo.shareWithOthers);
    const userName = profile.network2User2.firstName + ' ' + profile.network2User2.lastName;
    Util.setValue(repo.peopleandGroupInput, userName);
    Util.pause(2);
    Util.click(repo.userName(userName));
    Util.click(repo.publish);
    Util.waitForDisplayed(repo.updatingSharingInfoSuccessMessage);
    Util.pause(2);
    Util.waitForDisplayed(repo.sharedTextForPost(timestamp));
    Util.pause(2);
    Util.click(repo.sharedPostElipses(timestamp));
    Util.click(repo.copyLink);
    Util.waitForDisplayed(repo.copiedToClipboardAlertMessage);
    
    Util.click(repo.sharedPostElipses(timestamp));
    Util.click(repo.deletePostLinkInPostContextMenu);
    Util.waitForDisplayed(repo.movedtoTrash);
    Util.waitForNotDisplayed(repo.sharedPostTitle(timestamp));
   
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