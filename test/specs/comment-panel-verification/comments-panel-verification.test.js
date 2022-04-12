const repo = require('../../../object-repository/object-repo');
const profile = require('../../../config/profile');
const Util = require('../../../utils/utils');
const CustomCommand = require('../../../utils/custom-commands');

describe('comment panel verification', function () {

  // Author: Shoaib Arslan Kiyani
  // Total Test Cases: 08
  // Note: Some test cases are covered in gallery-view.test.js

  let currentBrowserSessionId = null;
  let newBrowserSessionId = null;
  const browserSessions = [];

  it('presence of comment menu in gallery view', function () {

    const imageUploadFileName = 'mario.jpg';

    CustomCommand.login(profile.url, profile.network4Admin1.email, profile.network4Admin1.password);

    const timestamp = CustomCommand.getTimestamp();

    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network4Admin1.email);
    Util.click(repo.suggestedPostRecipient);

    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an image file attachment.`);

    Util.pause(2);

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(imageUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);

    Util.click(repo.noteShareButton);

    Util.pause(5);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.pause(2);

    Util.click(repo.imageFileAttachmentInSharedPost(timestamp));

    Util.pause(5);

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);

    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName);

    Util.pause(2);

    Util.click(repo.postCommentArea);
    Util.keys(`${timestamp}: Post Comment`);
    Util.keys('Enter');

    Util.moveTo(repo.createdCommentInPostInCommentPanel(timestamp));
    Util.click(repo.createdCommentInPostElipses(timestamp));

    expect(Util.getText(repo.deleteCommentLink)).toBe('Delete');
    expect(Util.getText(repo.editCommentLink)).toBe('Edit');
    expect(Util.getText(repo.copyCommentLink)).toBe('Copy comment link');

  });

  it('use emoji with comment in feed view', function () {

    Util.click(repo.networkLogo);

    //CustomCommand.login(profile.url, profile.email, profile.password);

    const timestamp = CustomCommand.getTimestamp();

    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network4Admin1.email);
    Util.click(repo.suggestedPostRecipient);

    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an emoji in the comment.`);

    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.pause(1);

    Util.click(repo.createdPostCommentLink(timestamp));

    Util.keys(`${timestamp}: Comment With Emoji. `);
    Util.click(repo.emoticonIcon);
    Util.click(repo.firstEmoticonIcon);
    Util.keys('Enter');
    Util.waitForDisplayed(repo.feedViewCreatedCommentWithEmoji(timestamp));

  });

  it('real time like and unlike of comment in feed view', function () {

    Util.click(repo.networkLogo);

    currentBrowserSessionId = Util.getBrowserSession();
    browserSessions.push(currentBrowserSessionId);
    newBrowserSessionId = Util.openBrowser();
    browserSessions.push(newBrowserSessionId);

    Util.switchToBrowser(newBrowserSessionId);

    CustomCommand.login(profile.url, profile.network4User1.email, profile.network4User1.password);

    Util.switchToBrowser(currentBrowserSessionId);

    const timestamp = CustomCommand.getTimestamp();

    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network4Admin1.email);
    Util.click(repo.suggestedPostRecipient);

    Util.pause(2);

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post is addressed to @${profile.network4User1.firstName} ${profile.network4User1.lastName}`);

    Util.pause(2);

    const userFullName = profile.network4User1.firstName + ' ' + profile.network4User1.lastName;
    Util.click(repo.userNameSuggestion(userFullName));

    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.pause(1);

    Util.click(repo.createdPostCommentLink(timestamp));

    Util.keys(`${timestamp}: Please like this comment.`);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.feedViewCreatedCommentCommentPanel(timestamp));

    Util.takeScreenshot();

    Util.switchToBrowser(newBrowserSessionId);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.waitForDisplayed(repo.feedViewCreatedCommentCommentPanel(timestamp));

    Util.click(repo.feedViewCreatedCommentLikeLink(timestamp));

    Util.waitForDisplayed(repo.feedViewCreatedCommentUnLikeLink(timestamp));

    expect(Util.getText(repo.createdCommentLikeCount(timestamp))).toBe('1');

    Util.takeScreenshot();

    Util.switchToBrowser(currentBrowserSessionId);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    expect(Util.getText(repo.createdCommentLikeCount(timestamp))).toBe('1');

    Util.takeScreenshot();

    Util.switchToBrowser(newBrowserSessionId);

    Util.click(repo.feedViewCreatedCommentUnLikeLink(timestamp));
    Util.waitForDisplayed(repo.feedViewCreatedCommentLikeLink(timestamp));
    Util.waitForNotDisplayed(repo.createdCommentLikeCount(timestamp));

    Util.takeScreenshot();

    Util.switchToBrowser(currentBrowserSessionId);

    Util.waitForNotDisplayed(repo.createdCommentLikeCount(timestamp));
    Util.takeScreenshot();

  });

  it('real time textual comment creation and reply in feed view', function () {

    const timestamp = CustomCommand.getTimestamp();

    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network4Admin1.email);
    Util.click(repo.suggestedPostRecipient);

    Util.pause(2);

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post is addressed to @${profile.network4User1.firstName} ${profile.network4User1.lastName}`);

    Util.pause(2);

    const userFullName = profile.network4User1.firstName + ' ' + profile.network4User1.lastName;

    Util.click(repo.userNameSuggestion(userFullName));

    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.pause(1);

    Util.click(repo.createdPostCommentLink(timestamp));

    Util.keys(`${timestamp}: Please reply to this comment.`);
    Util.keys('Enter');

    Util.takeScreenshot();

    Util.switchToBrowser(newBrowserSessionId);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.waitForDisplayed(repo.feedViewCreatedCommentReply(timestamp));

    Util.click(repo.feedViewCreatedCommentReplyReplyLink(timestamp));
    Util.keys(`${timestamp}: Reply From Second User.`);
    Util.keys('Enter');

    Util.takeScreenshot();

    Util.switchToBrowser(currentBrowserSessionId);

    Util.waitForDisplayed(repo.feedViewCreatedCommentReply(timestamp));

    Util.waitForDisplayed(repo.replyToCommentFromSecondUser(timestamp));

    Util.takeScreenshot();

  });

  it('real time like of comment in gallery view', function () {

    const imageUploadFileName = 'mario.jpg';

    const timestamp = CustomCommand.getTimestamp();

    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network4Admin1.email);
    Util.click(repo.suggestedPostRecipient);

    Util.pause(2);

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post is addressed to @${profile.network4User1.firstName} ${profile.network4User1.lastName}`);

    const userFullName = profile.network4User1.firstName + ' ' + profile.network4User1.lastName;
    Util.click(repo.userNameSuggestion(userFullName));

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(imageUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);

    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.pause(1);

    Util.click(repo.imageFileAttachmentInSharedPost2(timestamp));

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);

    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName);

    Util.pause(3);

    Util.click(repo.postCommentArea);
    Util.keys(`${timestamp}: Please like this comment in gallery view.`);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.galleryViewCreatedComment(timestamp));

    Util.click(repo.galleryViewCreatedCommentLikeLink(timestamp));

    Util.waitForDisplayed(repo.galleryViewCreatedCommentUnLikeLink(timestamp));

    Util.takeScreenshot();

    Util.switchToBrowser(newBrowserSessionId);

    Util.takeScreenshot();

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.pause(1);

    Util.click(repo.imageFileAttachmentInSharedPost2(timestamp));

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);

    expect(Util.getText(repo.createdCommentLikeCountInGalleryView(timestamp))).toBe('1');

    Util.takeScreenshot();

    Util.switchToBrowser(currentBrowserSessionId);

    Util.click(repo.galleryViewCreatedCommentUnLikeLink(timestamp));

    Util.takeScreenshot();

    Util.switchToBrowser(newBrowserSessionId);

    Util.waitForNotDisplayed(repo.createdCommentLikeCountInGalleryView(timestamp));

    Util.switchToBrowser(currentBrowserSessionId);

  });

  it('real time textual comment creation and reply in gallery view', function () {

    const imageUploadFileName = 'mario.jpg';

    Util.click(repo.closeGallery);

    const timestamp = CustomCommand.getTimestamp();

    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network4Admin1.email);
    Util.click(repo.suggestedPostRecipient);

    Util.pause(2);

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post is addressed to @${profile.network4User1.firstName} ${profile.network4User1.lastName}`);

    Util.pause(2);

    const userFullName = profile.network4User1.firstName + ' ' + profile.network4User1.lastName;
    Util.click(repo.userNameSuggestion(userFullName));

    Util.uploadFile(repo.feedFileUploadInputField, Util.getResourcePath(imageUploadFileName));
    Util.waitForDisplayed(repo.fileUploadAndConversionSuccess);

    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.pause(1);

    Util.click(repo.imageFileAttachmentInSharedPost2(timestamp));

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);

    expect(Util.getText(repo.galleryViewFileName)).toBe(imageUploadFileName);

    Util.pause(2);

    Util.click(repo.postCommentArea);
    Util.keys(`${timestamp}: Please reply to this comment in gallery view.`);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.galleryViewCreatedComment(timestamp));

    Util.takeScreenshot();

    Util.switchToBrowser(newBrowserSessionId);

    Util.click(repo.closeGallery);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.pause(2);
    Util.click(repo.imageFileAttachmentInSharedPost2(timestamp));

    Util.waitForDisplayed(repo.loadingSpinnerinGalleryView);

    Util.click(repo.galleryViewCreatedCommentReplyLink(timestamp));
    Util.keys(`${timestamp}: Reply From Second User In Gallery View.`);
    Util.keys('Enter');

    Util.takeScreenshot();

    Util.switchToBrowser(currentBrowserSessionId);
    Util.waitForDisplayed(repo.replyToCommentFromSecondUserInGalleryView(timestamp));

  });

  it('presence of comment menu and edit comment in feed view', function () {

    const timestamp = CustomCommand.getTimestamp();

    Util.click(repo.closeGallery);

    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network4Admin1.email);
    Util.click(repo.suggestedPostRecipient);

    Util.pause(2)

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post will have an edited comment.`);

    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.pause(1);
    Util.click(repo.createdPostCommentLink(timestamp));

    Util.keys(`${timestamp}: Please edit this comment.`);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.feedViewCreatedComment(timestamp));

    Util.takeScreenshot();

    Util.moveTo(repo.feedViewCreatedComment(timestamp));

    Util.click(repo.createdCommentInFeedViewElipses(timestamp));

    expect(Util.getText(repo.deleteCommentLink)).toBe('Delete');
    expect(Util.getText(repo.editCommentLink)).toBe('Edit');
    expect(Util.getText(repo.copyCommentLink)).toBe('Copy comment link');

    Util.click(repo.editCommentLink);

    Util.keys(` Edited.`);
    Util.keys('Enter');

    Util.waitForDisplayed(repo.feedViewEditedComment(timestamp));

  });

  it('real time comment deletion in feed view', function () {

    const timestamp = CustomCommand.getTimestamp();

    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network4Admin1.email);
    Util.click(repo.suggestedPostRecipient);

    Util.pause(2);

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post is addressed to @${profile.network4User1.firstName} ${profile.network4User1.lastName}`);

    Util.pause(2);

    const userFullName = profile.network4User1.firstName + ' ' + profile.network4User1.lastName;
    Util.click(repo.userNameSuggestion(userFullName));

    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.pause(2);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.click(repo.createdPostCommentLink(timestamp));

    Util.keys(`${timestamp}: Please delete this comment.`);
    Util.keys('Enter');

    Util.takeScreenshot();

    Util.switchToBrowser(newBrowserSessionId);

    Util.click(repo.closeGallery);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));

    Util.waitForDisplayed(repo.feedViewCreatedComment(timestamp));

    Util.takeScreenshot();

    Util.switchToBrowser(currentBrowserSessionId);

    Util.moveTo(repo.feedViewCreatedComment(timestamp));

    Util.click(repo.createdCommentInFeedViewElipses(timestamp));

    Util.click(repo.deleteCommentLink);

    Util.takeScreenshot();

    Util.click(repo.deleteCommentButton);

    Util.waitForNotDisplayed(repo.feedViewCreatedComment(timestamp));

    Util.takeScreenshot();

    Util.switchToBrowser(newBrowserSessionId);

    Util.waitForNotDisplayed(repo.feedViewCreatedComment(timestamp));

    Util.takeScreenshot();

  });

  it('Expand/collapse comments bar ', function () {
    const timestamp = CustomCommand.getTimestamp();
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network4Admin1.email);
    Util.click(repo.suggestedPostRecipient);

    Util.pause(2);

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post is addressed to @${profile.network4User1.firstName} ${profile.network4User1.lastName}`);

    const userFullName = profile.network4User1.firstName + ' ' + profile.network4User1.lastName;
    Util.click(repo.userNameSuggestion(userFullName));
    Util.pause(2);
    Util.click(repo.noteShareButton);

    Util.waitForDisplayed(repo.sharedPostTitle(timestamp));
    Util.pause(1);

    for (let step = 0; step < 22; step++) {

      Util.click(repo.createdPostCommentLink(timestamp));

      Util.keys(`${timestamp}: Please reply to this comment.`);
      Util.keys('Enter');

      Util.takeScreenshot();
    }
    Util.click(repo.commentCounterLink(timestamp));
    Util.pause(2);
    Util.waitForNotDisplayed(repo.commentCounterLink(timestamp));
    Util.click(repo.hideCommentLink(timestamp));
    Util.waitForNotDisplayed(repo.hideCommentLink(timestamp));
  });


  xit(' comments banner verification ', function () {
    CustomCommand.login(profile.url, profile.network4Admin1.email, profile.network4Admin1.password);
    const timestamp = CustomCommand.getTimestamp();
    Util.click(repo.inlineInsertTextField);
    Util.click(repo.toInputField);
    Util.setValue(repo.typeToInputField, profile.network4Admin1.email);
    Util.click(repo.suggestedPostRecipient);

    Util.pause(2);

    Util.setValue(repo.noteTitleInputField, `Test Post: ${timestamp}`);
    Util.setValue(repo.noteBodyInputField, `${timestamp}: This post is addressed to @${profile.network4User1.firstName} ${profile.network4User1.lastName}`);

    const userFullName = profile.network4User1.firstName + ' ' + profile.network4User1.lastName;
    Util.click(repo.userNameSuggestion(userFullName));
    Util.pause(2);
    Util.click(repo.noteShareButton);
    Util.click(repo.createdPostCommentLink(timestamp));

    Util.keys(`${timestamp}: Please reply to this comment.`);
    Util.keys('Enter');

    Util.takeScreenshot();
    currentBrowserSessionId = Util.getBrowserSession();
    browserSessions.push(currentBrowserSessionId);
    newBrowserSessionId = Util.openBrowser();
    browserSessions.push(newBrowserSessionId);
    Util.switchToBrowser(newBrowserSessionId);
    CustomCommand.login(profile.url, profile.network4User1.email, profile.network4User1.password);

    Util.waitForDisplayed(repo.feedViewCreatedCommentReply(timestamp));

    Util.click(repo.feedViewCreatedCommentReplyReplyLink(timestamp));
    Util.keys(`${timestamp}: Reply From Second User.`);
    Util.keys('Enter');
    Util.takeScreenshot();

    Util.switchToBrowser(currentBrowserSessionId);

    Util.waitForDisplayed(repo.feedViewCreatedCommentReply(timestamp));

    Util.waitForDisplayed(repo.replyToCommentFromSecondUser(timestamp));

    Util.takeScreenshot();
    Util.switchToBrowser(currentBrowserSessionId);
    Util.click(repo.createdPostCommentLink(timestamp));

    Util.keys(`${timestamp}: Please reply to this comment.`);
    Util.keys('Enter');
    Util.takeScreenshot();
    Util.switchToBrowser(newBrowserSessionId);

    Util.waitForDisplayed(repo.feedViewCreatedCommentReply(timestamp));

    Util.click(repo.feedViewCreatedCommentReplyReplyLink(timestamp));
    Util.keys(`${timestamp}: Reply From Second User.`);
    Util.keys('Enter');
    Util.takeScreenshot();
    Util.switchToBrowser(currentBrowserSessionId);
    Util.click(repo.createdPostCommentLink(timestamp));

    Util.keys(`${timestamp}: Please reply to this comment.`);
    Util.keys('Enter');
    Util.takeScreenshot();
    Util.switchToBrowser(newBrowserSessionId);

    Util.waitForDisplayed(repo.feedViewCreatedCommentReply(timestamp));

    Util.click(repo.feedViewCreatedCommentReplyReplyLink(timestamp));
    Util.keys(`${timestamp}: Reply From Second User.`);
    Util.keys('Enter');
    Util.takeScreenshot();
    Util.switchToBrowser(currentBrowserSessionId);
    Util.click(repo.createdPostCommentLink(timestamp));

    Util.keys(`${timestamp}: Please reply to this comment.`);
    Util.keys('Enter');
    Util.takeScreenshot();
    Util.switchToBrowser(currentBrowserSessionId);
    Util.click(repo.createdPostCommentLink(timestamp));

    Util.keys(`${timestamp}: Please reply to this comment.`);
    Util.keys('Enter');
    Util.takeScreenshot();
    Util.switchToBrowser(newBrowserSessionId);

    Util.waitForDisplayed(repo.feedViewCreatedCommentReply(timestamp));

    Util.click(repo.feedViewCreatedCommentReplyReplyLink(timestamp));
    Util.keys(`${timestamp}: Reply From Second User.`);
    Util.keys('Enter');
    Util.takeScreenshot();
    Util.switchToBrowser(currentBrowserSessionId);
    Util.click(repo.sharedPostTitle(timestamp));
    const commentCountBeforeUserScroll = Util.getElementsCount(repo.commentCollectionInCommentScrollbarPanel);
    console.log('comment count before user scroll:', commentCountBeforeUserScroll);

    Util.click(repo.commentCounterAnotherLink);

    Util.keys('Start');
    Util.keys('Start');

    Util.pause(5);

    const commentCountAfterUserScroll = Util.getElementsCount(repo.commentCollectionInCommentScrollbarPanel);
    console.log('comment count after user scroll:', commentCountAfterUserScroll);

    expect(commentCountAfterUserScroll).toBeGreaterThan(commentCountBeforeUserScroll);
    Util.pause(5);
  });


  after(function () {
    if (this.currentTest.state === 'failed') {
      browserSessions.forEach((browserSession) => {
        try {
          Util.switchToBrowser(browserSession);
          browser.deleteSession();
          console.log('INFO:', 'Closing browser due to failure of test case.');
        } catch (error) { }
      });
    }
  });


});